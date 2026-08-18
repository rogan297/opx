# OPX System — Documentação Técnica

## 1. Visão Geral

O **OPX System** é um sistema后端 (backend) de gerenciamento de restaurantes e produção alimentícia, também descrito como um **KDS (Kitchen Display System)**. Foi construído com **NestJS 11**, **Prisma 7 ORM** e **PostgreSQL**, oferecendo uma API RESTful com documentação Swagger.

### 1.1 Propósito

Automatizar e integrar as operações de um restaurante, desde o cadastro de clientes e produtos até o rastreamento de pedidos, controle de estoque, movimentação de insumos, estações de produção, workflows customizáveis e ordens de produção.

### 1.2 Stack Tecnológica

| Tecnologia | Função |
|-----------|--------|
| **NestJS 11** | Framework backend progressivo (Node.js/TypeScript) |
| **TypeScript 5.7** | Linguagem de programação |
| **Node.js** | Runtime |
| **PostgreSQL** | Banco de dados relacional |
| **Prisma 7** | ORM com adapter PostgreSQL (`@prisma/adapter-pg`) |
| **Passport.js** | Estratégias de autenticação (JWT, local) |
| **JWT** | Autenticação por tokens |
| **Argon2** | Hash de senhas |
| **RabbitMQ** | Message broker (filas assíncronas) |
| **Swagger** | Documentação automática da API (`/api`) |
| **class-validator** | Validação de DTOs |
| **Jest** | Testes |

---

## 2. Arquitetura do Sistema

### 2.1 Multi-tenancy (Múltiplos Restaurantes)

O sistema é multi-tenant: cada entidade (Customer, Product, Order, Station, Workflow) possui um `restaurantId` que isola os dados de cada restaurante.

### 2.2 Segurança

- **Autenticação JWT** — todas as rotas são protegidas por um guard global (`JwtAuthGuard`)
- **Controle de acesso por papéis (RBAC)** — o campo `roles` no JWT (array de strings) permite autorização granular via `RolesGuard`
- **Senhas hasheadas com Argon2** — nunca armazenadas em texto puro
- **Rota pública** via decorator `@Public()` (ex.: `/auth/login`)

### 2.3 Mensageria (RabbitMQ)

O módulo **TransporterModule** configura um cliente RabbitMQ para a `main_queue`. O módulo **InventoryModule** possui sua própria fila (`inventory_queue`) e emite eventos `inventory.updated` sempre que um inventário é criado ou atualizado.

---

## 3. Módulos e Componentes

### 3.1 Core / Bootstrap

#### `src/main.ts`
Ponto de entrada da aplicação. Configura:
- `ValidationPipe` global com whitelist, forbidNonWhitelisted e transform
- CORS para origens específicas (`192.168.1.10:4000`, `localhost:4000`, `0.0.0.0:4000`)
- Swagger em `/api` com título "OPX System"
- Porta a partir de `process.env.PORT` (default 3000)

#### `src/app.module.ts`
Módulo raiz que importa todos os 17 módulos de funcionalidade e registra o `JwtAuthGuard` como guard global.

#### `src/prisma/prisma.service.ts`
Extended `PrismaClient` que usa `PrismaPg` adapter para conexão com PostgreSQL. Conecta ao iniciar (`onModuleInit`) e desconecta ao destruir (`onModuleDestroy`).

---

### 3.2 Autenticação — `/auth`

**Endpoints:**

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/auth/login` | Login público — retorna JWT |

**Funcionamento:**
- Recebe email + senha, valida com Argon2
- Gera JWT com payload: `{ email, sub: userId, roles, restaurantId }`
- Resposta: `{ accessToken, user: { id, email, roles, restaurantId } }`

**Estratégias e Guards:**
- `JwtStrategy` — extrai token do header Bearer e valida com `JWT_SECRET`
- `JwtAuthGuard` — guard global, aplicado em todas as rotas
- `RolesGuard` — guard opcional para verificar papéis específicos
- `@Public()` — decorator para tornar uma rota pública

---

### 3.3 Restaurante — `/restaurant`

**Endpoints:** CRUD completo (POST, GET, GET/:id, PATCH/:id, DELETE/:id)

**Função:** Gerenciar os restaurantes cadastrados no sistema. Cada restaurante é a entidade raiz do multi-tenancy; todas as outras entidades pertencem a um restaurante.

**Campos:** `id` (UUID), `name` (obrigatório), `createdAt`, `updatedAt`

---

### 3.4 Usuário — `/user`

**Endpoints:** CRUD completo

**Função:** Gerenciar usuários do sistema com controle de acesso baseado em papéis.

**Regras de negócio:**
- Senha é hasheada com Argon2 antes de armazenar
- Verificação de email duplicado — lança `ConflictException`
- Senha nunca retornada nas respostas
- `CreateUserDto`: email, password (min 8), firstName, lastName, restaurantId, roles (default `['admin']`), isActive

---

### 3.5 Cliente — `/customer`

**Endpoints:** CRUD completo

**Função:** Gerenciar clientes do restaurante. Clientes são vinculados a um restaurante via `restaurantId` e associados a pedidos.

**Campos:** `name` (obrigatório), `restaurantId` (UUID)

---

### 3.6 Produto — `/product`

**Endpoints:** CRUD completo

**Função:** Cadastro de produtos do cardápio. Produtos podem ser de dois tipos:
- `RAW_MATERIAL` — insumos/matéria-prima
- `FINISHED_GOOD` — produto finalizado

**Regras de negócio:**
- Ao criar um produto, um registro de **Inventory** é automaticamente criado com `quantityAvailable: 0` e `minThreshold: 5`
- Preço usa `Prisma.Decimal(10,2)` para precisão monetária
- Relacionamento 1:1 com Inventory

---

### 3.7 Inventário — `/inventory`

**Endpoints:** CRUD completo

**Função:** Controlar o estoque de cada produto. Mantém a quantidade disponível e o threshold mínimo.

**Regras de negócio:**
- Relacionamento 1:1 com Product
- Na criação/atualização, emite evento `inventory.updated` via RabbitMQ para `inventory_queue`
- Integração com o módulo de StockMovement para ajustes atômicos de estoque

---

### 3.8 Movimentação de Estoque — `/stockmovement`

**Endpoints:** CRUD completo + GET por inventoryId

**Função:** Registrar todas as movimentações de estoque com auditoria completa.

**Tipos de Movimentação (`MovementType`):**
| Tipo | Descrição | Efeito no Estoque |
|------|-----------|-------------------|
| `INPUT` | Entrada (compra) | Aumenta |
| `OUTPUT` | Saída (venda/perda) | Diminui |
| `PRODUCTION_INPUT` | Entrada na produção (uso de insumo) | Diminui |
| `PRODUCTION_OUTPUT` | Saída da produção (produto finalizado) | Aumenta |

**Razões (`MovementReason`):** PRODUCTION_FINISH, SALE, WASTE, ADJUSTMENT, PUCHASE

**Regras de negócio:**
- Ajuste de estoque é **atômico** — usa `prisma.$transaction` para garantir consistência
- `inventory.quantityAvailable` é atualizado via `increment` (operações atômicas no banco)

---

### 3.9 Pedido — `/order`

**Endpoints:** CRUD completo

**Função:** Gerenciar pedidos dos clientes. Cada pedido contém múltiplos itens.

**Status do Pedido (`OrderStatus`):**
PENDING → CONFIRMED → PREPARING → READY → COMPLETED / CANCELLED

**Status de Pagamento (`PaymentStatus`):**
PENDING → PAID / FAILED / REFUNDED

**Regras de negócio:**
- Criação de pedido já inclui os itens (`items` array no DTO) em uma única transação
- Total usa `Prisma.Decimal(10,2)`

---

### 3.10 Item do Pedido — `/order-item`

**Endpoints:** CRUD completo

**Função:** Gerenciar itens individuais de um pedido, controlando o status de preparação de cada um.

**Status de Preparação (`PreparationStatus`):**
PENDING → IN_PROGRESS → READY → COMPLETED

---

### 3.11 Estação de Trabalho — `/station`

**Endpoints:** CRUD completo (GET aceita `?restaurantId=`)

**Função:** Representar estações físicas ou digitais de trabalho na cozinha/linha de produção (ex.: "Chapa", "Fritadeira", "Montagem", "Embalagem").

**Campos:** `name`, `description`, `isActive`, `currentLoad` (carga atual), `responsible` (responsável)

**Relacionamentos:** Uma estação pode ter múltiplos itens na fila (`StationQueue`).

---

### 3.12 Fila de Estação — `/station-queue`

**Endpoints:**

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/station-queue` | Entrar na estação (criar item na fila) |
| PATCH | `/station-queue/:id/exit` | Sair da estação (marcar saída) |
| GET | `/station-queue` | Listar fila |
| GET/PATCH/DELETE | `/station-queue/:id` | CRUD individual |

**Função:** Gerenciar a fila de ordens de produção em cada estação. Rastreia quando uma ordem de produção **entra** (`enteredAt`) e **sai** (`exitedAt`) de cada estação.

---

### 3.13 Workflow — `/workflow`

**Endpoints:** CRUD + activate + pause

**Função:** Workflows customizáveis que definem o fluxo de produção de um item.

**Status do Workflow (`WorkflowStatus`):**
DRAFT → ACTIVE → PAUSED → ERROR

**Regras de negócio:**
- Workflow pode conter múltiplos steps (etapas)
- Ao atualizar, faz **sincronização de steps** em transação:
  1. Atualiza cabeçalho do workflow
  2. Remove steps que não estão na nova lista (por ID)
  3. Faz upsert de cada step (cria ou atualiza)
- Campo `dsl` armazena o DSL do workflow como JSON

---

### 3.14 Etapa de Workflow — `/workflowstep`

**Endpoints:** CRUD completo

**Função:** Definir cada etapa de um workflow de produção.

**Categoria da Etapa (`StepCategory`):**
| Categoria | Descrição |
|-----------|-----------|
| `ACTION` | Ação executável na estação |
| `LOGIC` | Lógica condicional (IF/ELSE) |
| `TRANSFORM` | Transformação do produto |

**Tipo de Ação (`StepActionType`):**
PREPARE, COOK, ASSEMBLE, FRY, GRILL, PACK, EXPEDITE

**Campos:** `workflowId`, `stationId` (opcional), `category`, `actionType`, `config` (JSON), `inputs`, `estimatedTime`, `nextStepId` (próxima etapa), `branching`

---

### 3.15 Ordem de Produção — `/production-order`

**Endpoints:** CRUD + advance + complete

**Função:** Executar o workflow de produção para um item de pedido específico.

**Status de Produção (`ProductionStatus`):**
PENDING → IN_PROGRESS → READY → COMPLETED

**Regras de negócio:**
- **Criação:** busca o workflow, localiza o primeiro step, define status como `IN_PROGRESS` (se houver step inicial) ou `PENDING`
- **Avançar etapa (`advance`):** segue o `nextStepId` para a próxima etapa; se não houver próxima, marca como `READY` com `finishedAt`
- **Completar (`complete`):** define status `COMPLETED` e `finishedAt` como data atual

---

### 3.16 Padrão de Qualidade — `/standard` (em desenvolvimento)

**Endpoints:** CRUD básico (implementação placeholder)

**Função:** Gerenciar padrões de qualidade (ex.: ISO 9001, NR-10, LEED) com seções e requisitos.

**Status:** Módulo **incompleto** — os métodos retornam strings placeholder. Os modelos `StandardSection` e `Requirement` existem no schema Prisma mas não possuem módulos implementados.

---

### 3.17 Transporter (RabbitMQ) — `/transporter`

**Função:** Módulo de infraestrutura que configura o cliente RabbitMQ (`BROKER_SERVICE`) para a `main_queue`. Não possui controllers ou services — puramente infraestrutura.

---

## 4. Modelo de Dados (Prisma Schema)

### 4.1 Entidades Principais

```
Restaurant (1) ──── (N) User
Restaurant (1) ──── (N) Customer
Restaurant (1) ──── (N) Product
Restaurant (1) ──── (N) Order
Restaurant (1) ──── (N) Station
Restaurant (1) ──── (N) Workflow
Customer   (1) ──── (N) Order
Order      (1) ──── (N) OrderItem
Product    (1) ──── (1) Inventory
Product    (1) ──── (N) OrderItem
OrderItem  (1) ──── (1) ProductionOrder
Inventory  (1) ──── (N) StockMovement
Station    (1) ──── (N) StationQueue
ProductionOrder (1) ── (N) StationQueue
Workflow   (1) ──── (N) WorkflowStep
```

### 4.2 Enums

| Enum | Valores |
|------|---------|
| OrderStatus | PENDING, CONFIRMED, PREPARING, READY, COMPLETED, CANCELLED |
| PaymentStatus | PENDING, PAID, FAILED, REFUNDED |
| PreparationStatus | PENDING, IN_PROGRESS, READY, COMPLETED |
| ProductType | RAW_MATERIAL, FINISHED_GOOD |
| MovementType | INPUT, OUTPUT, PRODUCTION_INPUT, PRODUCTION_OUTPUT |
| MovementReason | PRODUCTION_FINISH, SALE, WASTE, ADJUSTMENT, PUCHASE |
| WorkflowStatus | DRAFT, ACTIVE, PAUSED, ERROR |
| StepActionType | PREPARE, COOK, ASSEMBLE, FRY, GRILL, PACK, EXPEDITE |
| StepCategory | ACTION, LOGIC, TRANSFORM |
| ProductionStatus | PENDING, IN_PROGRESS, READY, COMPLETED |

### 4.3 Índices

Todas as tabelas possuem índices nas chaves estrangeiras (`restaurantId`, `customerId`, `inventoryId`, `orderId`, `productId`, `stationId`, `productionOrderId`) para performance de consultas.

---

## 5. API — Mapa Completo de Rotas (55 endpoints)

### Autenticação
| Método | Rota | Proteção |
|--------|------|----------|
| POST | `/auth/login` | Pública |

### Restaurante
| Método | Rota |
|--------|------|
| POST | `/restaurant` |
| GET | `/restaurant` |
| GET | `/restaurant/:id` |
| PATCH | `/restaurant/:id` |
| DELETE | `/restaurant/:id` |

### Usuário
| Método | Rota |
|--------|------|
| POST | `/user` |
| GET | `/user` |
| GET | `/user/:id` |
| PATCH | `/user/:id` |
| DELETE | `/user/:id` |

### Cliente
| Método | Rota |
|--------|------|
| POST | `/customer` |
| GET | `/customer` |
| GET | `/customer/:id` |
| PATCH | `/customer/:id` |
| DELETE | `/customer/:id` |

### Produto
| Método | Rota |
|--------|------|
| POST | `/product` |
| GET | `/product` |
| GET | `/product/:id` |
| PATCH | `/product/:id` |
| DELETE | `/product/:id` |

### Inventário
| Método | Rota |
|--------|------|
| POST | `/inventory` |
| GET | `/inventory` |
| GET | `/inventory/:id` |
| PATCH | `/inventory/:id` |
| DELETE | `/inventory/:id` |

### Pedido
| Método | Rota |
|--------|------|
| POST | `/order` |
| GET | `/order` |
| GET | `/order/:id` |
| PATCH | `/order/:id` |
| DELETE | `/order/:id` |

### Item do Pedido
| Método | Rota |
|--------|------|
| POST | `/order-item` |
| GET | `/order-item` |
| GET | `/order-item/:id` |
| PATCH | `/order-item/:id` |
| DELETE | `/order-item/:id` |

### Movimentação de Estoque
| Método | Rota |
|--------|------|
| POST | `/stockmovement` |
| GET | `/stockmovement` |
| GET | `/stockmovement/:id` |
| GET | `/stockmovement/inventory/:inventoryId` |
| PATCH | `/stockmovement/:id` |
| DELETE | `/stockmovement/:id` |

### Estação
| Método | Rota |
|--------|------|
| POST | `/station` |
| GET | `/station?restaurantId=` |
| GET | `/station/:id` |
| PATCH | `/station/:id` |
| DELETE | `/station/:id` |

### Fila de Estação
| Método | Rota |
|--------|------|
| POST | `/station-queue` |
| GET | `/station-queue` |
| GET | `/station-queue/:id` |
| PATCH | `/station-queue/:id` |
| PATCH | `/station-queue/:id/exit` |
| DELETE | `/station-queue/:id` |

### Workflow
| Método | Rota |
|--------|------|
| POST | `/workflow` |
| GET | `/workflow?restaurantId=` |
| GET | `/workflow/:id` |
| PATCH | `/workflow/:id` |
| DELETE | `/workflow/:id` |
| PATCH | `/workflow/:id/activate` |
| PATCH | `/workflow/:id/pause` |

### Etapa de Workflow
| Método | Rota |
|--------|------|
| POST | `/workflowstep` |
| GET | `/workflowstep` |
| GET | `/workflowstep/:id` |
| PATCH | `/workflowstep/:id` |
| DELETE | `/workflowstep/:id` |

### Ordem de Produção
| Método | Rota |
|--------|------|
| POST | `/production-order` |
| GET | `/production-order` |
| GET | `/production-order/:id` |
| PATCH | `/production-order/:id` |
| PATCH | `/production-order/:id/advance` |
| PATCH | `/production-order/:id/complete` |
| DELETE | `/production-order/:id` |

### Padrão de Qualidade
| Método | Rota |
|--------|------|
| POST | `/standard` |
| GET | `/standard` |
| GET | `/standard/:id` |
| PATCH | `/standard/:id` |
| DELETE | `/standard/:id` |

---

## 6. Fluxo de Produção (End-to-End)

O fluxo principal de uso do sistema:

1. **Restaurante** é cadastrado
2. **Usuários** são criados com papéis (admin, cozinha, etc.)
3. **Clientes** são registrados
4. **Produtos** são cadastrados (insumos `RAW_MATERIAL` e/ou produtos finais `FINISHED_GOOD`)
5. **Inventário** é populado automaticamente para cada produto
6. **Workflows** são criados com etapas (ex.: PREPARE → COOK → ASSEMBLE → PACK → EXPEDITE)
7. **Estações** são configuradas (ex.: "Chapa", "Montagem", "Embalagem")
8. **Pedidos** são criados com itens
9. **Ordens de Produção** são geradas para cada item do pedido, vinculadas a um workflow
10. A ordem de produção **avança** pelas etapas do workflow, passando pelas **filas das estações**
11. **Movimentações de Estoque** registram a saída de insumos e entrada de produtos finalizados
12. Quando todas as etapas são concluídas, a ordem é marcada como **COMPLETED**

---

## 7. Observações Técnicas

### 7.1 Módulo Standard (incompleto)
O módulo `Standard` é um placeholder — os métodos do service retornam strings e não há integração com Prisma. Os modelos `StandardSection` e `Requirement` existem no schema mas não têm implementação.

### 7.2 WorkflowStep — Inconsistência de tipos
Os métodos `findOne`, `update` e `remove` do `WorkflowStepService` convertem o ID com `+id` (operador unário para número), mas o schema Prisma usa UUID strings. Isso pode causar erros em runtime.

### 7.3 Registro de usuário
O DTO `RegisterDto` existe no módulo Auth, mas não há endpoint `/auth/register` implementado no controller.

### 7.4 RabbitMQ
O InventoryModule importa o cliente RabbitMQ diretamente em vez de usar o TransporterModule, o que pode ser refatorado para melhor reuso.

---

## 8. Configuração e Execução

### Ambiente
```env
DATABASE_URL="postgresql://postgres:1234@localhost:5432/nestdb?schema=public"
JWT_SECRET="mi_clave_secreta_super_larga_2026"
```

### Scripts
| Comando | Descrição |
|---------|-----------|
| `npm run start:dev` | Iniciar em modo desenvolvimento |
| `npm run build` | Compilar TypeScript |
| `npm run start:prod` | Iniciar em produção |
| `npm run lint` | Verificar lint |
| `npm test` | Rodar testes |
| `npm run test:e2e` | Rodar testes e2e |

### Seed
```bash
npx prisma db seed
# Cria admin: admin@admin.com / admin
```

---

## 9. Estrutura de Diretórios

```
opx/
├── prisma/
│   ├── schema.prisma          # Schema completo do banco
│   ├── seed.ts                # Seed do banco
│   ├── migrations/            # Migrações (14 arquivos)
│   ├── docs.md                # Documentação do banco (PT-BR)
│   └── generate_docs.py       # Script para gerar PDF da documentação
├── src/
│   ├── main.ts                # Bootstrap da aplicação
│   ├── app.module.ts          # Módulo raiz
│   ├── prisma/                # Conexão com PostgreSQL
│   ├── auth/                  # Autenticação JWT
│   ├── restaurant/            # CRUD de restaurantes
│   ├── user/                  # CRUD de usuários
│   ├── customer/              # CRUD de clientes
│   ├── product/               # CRUD de produtos
│   ├── inventory/             # Controle de estoque
│   ├── stockmovement/         # Movimentações de estoque
│   ├── order/                 # Pedidos
│   ├── order-item/            # Itens dos pedidos
│   ├── station/               # Estações de trabalho
│   ├── station-queue/         # Filas das estações
│   ├── workflow/              # Workflows de produção
│   ├── workflowstep/          # Etapas dos workflows
│   ├── production-order/      # Ordens de produção
│   ├── standard/              # Padrões de qualidade
│   └── transporter/           # RabbitMQ (message broker)
├── test/                      # Testes e2e
├── seed.ts                    # Seed alternativo
├── package.json
└── tsconfig.json
```
