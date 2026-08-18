# Documentação Técnica — Redcoffee Platform

**Repositório:** `redcoffe-web-interfaz`  
**Versão:** 0.1.0  
**Stack:** Next.js 16 + React 19 + TypeScript 5 + Tailwind CSS 4 + Zustand 5 + NextAuth.js 4  
**Porta local:** 4000  
**Backend:** NestJS em `http://192.168.1.10:3000`

---

## Índice

1. [Módulo de Autenticação](#1-módulo-de-autenticação)
2. [Ponto de Venda — PDV](#2-ponto-de-venda--pdv)
3. [Dashboard Administrativo](#3-dashboard-administrativo)
4. [Gestão de Produtos](#4-gestão-de-produtos)
5. [Gestão de Estoque](#5-gestão-de-estoque)
6. [Gestão de Fornecedores](#6-gestão-de-fornecedores)
7. [Gestão de Produção — Kanban](#7-gestão-de-produção--kanban)
8. [Estações de Produção](#8-estações-de-produção)
9. [Workflows de Produção — Designer Visual](#9-workflows-de-produção--designer-visual)
10. [Gestão de Funcionários](#10-gestão-de-funcionários)
11. [Inventário / Insumos](#11-inventário--insumos)
12. [Manutenção de Ativos](#12-manutenção-de-ativos)
13. [Métricas e BI](#13-métricas-e-bi)
14. [IA Manager](#14-ia-manager)
15. [Normas e Compliance](#15-normas-e-compliance)
16. [Componentes Compartilhados](#16-componentes-compartilhados)
17. [APIs Externas](#17-api-externas-backend-nestjs)
18. [Variáveis de Ambiente](#18-variáveis-de-ambiente)
19. [Arquitetura](#19-arquitetura-em-camadas)
20. [Índice de Arquivos](#20-índice-de-arquivos-principais)

---

## 1. Módulo de Autenticação

**Rotas:** `/login`, `/register`, `/forgot-password/*`  
**Arquivos:** `src/app/(auth)/*`, `src/app/api/auth/[...nextauth]/route.ts`, `src/middleware.ts`

### O que é
Sistema de autenticação com fluxo completo de login, registro e recuperação de senha. Utiliza NextAuth.js com CredentialsProvider e estratégia JWT.

### Função
Controlar acesso às rotas protegidas da plataforma, autenticando usuários contra o backend NestJS e mantendo sessão via JWT.

### Funcionalidades

| Funcionalidade | Descrição |
|---|---|
| **Login** | Formulário de email/senha. Envia `POST /auth/login` ao backend NestJS via Axios no CredentialsProvider. Em caso de sucesso, armazena `accessToken` e dados do usuário no token JWT do NextAuth. |
| **Registro** | Formulário de cadastro de novo usuário. **Apenas UI — sem integração com API.** |
| **Recuperação de senha (3 etapas)** | 1. Informar e-mail → 2. Inserir código de 6 dígitos → 3. Definir nova senha. **Apenas UI — sem integração com API.** |
| **Middleware de proteção** | `src/middleware.ts` usa `getToken` do `next-auth/jwt` para verificar autenticação. Redireciona não autenticados para `/login?callbackUrl=...`. Matcher exclui `/api`, `/_next/static`, `/_next/image`, `/favicon.ico`. |
| **JWT Strategy** | Token contém: `accessToken` (do backend), dados completos do usuário. Callbacks `jwt` e `session` no NextAuth expõem os dados ao frontend. |

### Fluxo de autenticação

```
Usuário → /login → signIn("credentials", { email, password })
  → NextAuth CredentialsProvider → POST /auth/login (Axios) → Backend NestJS
  → Retorno: { user, accessToken }
  → JWT callback: merge user + accessToken no token
  → Session callback: expõe token como session.user
```

### Como chamar

```
GET  /login                              → Página de login
POST /api/auth/[...nextauth]             → Handler NextAuth (credentials)
GET  /register                           → Página de registro
GET  /forgot-password                    → Recuperação de senha
GET  /forgot-password/verify-code        → Verificação de código
GET  /forgot-password/reset-password     → Redefinição de senha
```

---

## 2. Ponto de Venda — PDV

**Rota:** `/pdv`  
**Arquivo:** `src/app/(protected)/pdv/page.tsx`  
**Layout:** `src/app/(protected)/layout.tsx` (Navbar)

### O que é
Interface de Ponto de Venda (POS) para vendas rápidas no balcão da cafeteria.

### Função
Permitir que funcionários realizem vendas, selecionem produtos, gerenciem carrinho e finalizem pedidos com diferentes formas de pagamento.

### Funcionalidades

| Funcionalidade | Descrição |
|---|---|
| **Catálogo de produtos** | Grid com produtos mockados, exibindo nome, preço e imagem. |
| **Busca de produtos** | Input de pesquisa que filtra produtos por nome. |
| **Carrinho lateral** | Lista de itens adicionados com controle de quantidade (+/-) e remoção. |
| **Métodos de pagamento** | Três opções: Dinheiro, Cartão, PIX. |
| **Cálculo de total** | Soma automática dos valores do carrinho. |
| **Finalizar venda** | Botão "Finalizar Venda" (sem integração com API no momento). |

### Como chamar

```
GET /pdv   → Interface do PDV (rota protegida)
```

---

## 3. Dashboard Administrativo

**Rota:** `/admin`  
**Arquivo:** `src/app/admin/page.tsx`  
**Layout:** `src/app/admin/layout.tsx` (Sidebar + Header)

### O que é
Página inicial do painel administrativo com indicadores-chave de desempenho (KPIs).

### Função
Fornecer visão geral do negócio com métricas resumidas, gráfico de produção e feed de atividades recentes.

### Funcionalidades

| Funcionalidade | Descrição |
|---|---|
| **Cards de estatísticas** | 4 cards: Produção Diária, Vendas Mensais, Novos Clientes, Alertas de Estoque. |
| **Gráfico de produção** | Gráfico de barras placeholder representando o fluxo de produção. |
| **Atividades recentes** | Feed vertical com timestamps e descrições de atividades. |
| **Link para histórico** | Botão "Ver todo histórico". |

### Como chamar

```
GET /admin   → Dashboard administrativo (rota protegida)
```

---

## 4. Gestão de Produtos

**Rotas:** `/admin/products`, `/admin/products/new`, `/admin/products/update`  
**Arquivos:** `src/app/admin/products/*`

### O que é
CRUD completo do catálogo de produtos da cafeteria.

### Função
Gerenciar o portfólio de itens vendidos, incluindo cadastro, edição, visualização e exclusão.

### Funcionalidades

| Funcionalidade | Descrição | API |
|---|---|---|
| **Listagem de produtos** | Cards com imagem (placeholder), nome, preço, info nutricional, descrição. Botão "Edit Details". | `GET /product` |
| **Criação de produto** | Formulário: nome, descrição, preço, categoria. Inclui `restaurantId` e JWT no body/header. | `POST /product` |
| **Edição de produto** | Formulário pré-preenchido via `GET /product/:id`. | `PATCH /product/:id` |
| **Exclusão de produto** | Modal de confirmação antes de excluir. | `DELETE /product/:id` |

### Como chamar

```
GET    /admin/products              → Listar produtos
GET    /admin/products/new          → Criar produto
GET    /admin/products/update?id=<id> → Editar produto
```

---

## 5. Gestão de Estoque

**Rotas:** `/admin/stock`, `/admin/stock/new`, `/admin/stock/[id]`  
**Arquivos:** `src/app/admin/stock/*`

### O que é
Sistema de controle de inventário e movimentação de estoque.

### Função
Monitorar níveis de estoque, registrar movimentações e configurar alertas de reposição.

### Funcionalidades

| Funcionalidade | Descrição | API |
|---|---|---|
| **Listagem de estoque** | Tabela com colunas: item, quantidade, status, ações. Status calculado: **Crítico** (≤ mínimo), **Alerta** (< 2× mínimo), **Estável**. | `GET /inventory` |
| **Adicionar movimentação** | Formulário para registrar entrada/saída de estoque. | — |
| **Detalhe do item** | Barra de quantidade, timeline de movimentações, configuração de alertas (modal com min/max threshold). | `GET /inventory/:id` / `GET /stockmovement/inventory/:id` / `PATCH /inventory/:id` |

### Como chamar

```
GET    /admin/stock             → Listar estoque
GET    /admin/stock/new         → Adicionar movimentação
GET    /admin/stock/<id>        → Detalhe do item + histórico
```

---

## 6. Gestão de Fornecedores

**Rota:** `/admin/suppliers`  
**Arquivo:** `src/app/admin/suppliers/page.tsx`

### O que é
Módulo de gerenciamento de fornecedores com indicadores e banner de auditoria IA.

### Função
Centralizar informações, avaliações e métricas dos fornecedores da cafeteria.

### Funcionalidades

| Funcionalidade | Descrição |
|---|---|
| **Cards de estatísticas** | 3 indicadores: Entregas no Prazo, Economia via IA, Qualidade SLA. |
| **Busca/Filtro** | Barra de pesquisa por nome de fornecedor. |
| **Cards de fornecedor** | Nome, rating (estrelas), % confiabilidade, último pedido, informações de contato. |
| **Banner de auditoria IA** | Banner informativo sobre auditoria inteligente de fornecedores. |

### Como chamar

```
GET /admin/suppliers   → Gestão de fornecedores
```

---

## 7. Gestão de Produção — Kanban

**Rota:** `/admin/production`  
**Arquivo:** `src/app/admin/production/page.tsx`

### O que é
Quadro Kanban de ordens de produção com três estágios.

### Função
Acompanhar e gerenciar o status das ordens de produção em tempo real, permitindo avançar ou concluir etapas.

### Funcionalidades

| Funcionalidade | Descrição | API |
|---|---|---|
| **Quadro Kanban** | 3 colunas: **Pendentes** (PENDING), **Em Preparo** (IN_PROGRESS), **Prontos** (READY). | `GET /production-order` |
| **Cards de ordem** | Exibem: ID, nome do produto, cliente, tempo decorrido, estação atual. | — |
| **Avançar ordem** | Botão para mover ordem para próxima estação. | `PATCH /production-order/:id/advance` |
| **Completar ordem** | Botão para finalizar ordem de produção. | `PATCH /production-order/:id/complete` |
| **Navegação** | Botões de atalho para Estações e Workflows. | — |

### Como chamar

```
GET  /admin/production   → Kanban de produção
```

---

## 8. Estações de Produção

**Rota:** `/admin/production/stations`  
**Arquivo:** `src/app/admin/production/stations/page.tsx`

### O que é
CRUD de estações de trabalho na linha de produção.

### Função
Definir e monitorar as estações onde as ordens de produção são processadas.

### Funcionalidades

| Funcionalidade | Descrição | API |
|---|---|---|
| **Listagem de estações** | Cards com nome, descrição, responsável, badge ativo/inativo, barra de carga (load %). | `GET /station?restaurantId=` |
| **Criação de estação** | Modal com formulário: nome, descrição, responsável. | `POST /station` |

### Como chamar

```
GET  /admin/production/stations   → Gerenciar estações
```

---

## 9. Workflows de Produção — Designer Visual

**Rotas:** `/admin/production/workflows`, `/admin/production/workflows/new`, `/admin/production/workflows/[id]`, `/admin/production/workflows/teste`  
**Arquivos:** `src/app/admin/production/workflows/*`  
**Store:** `src/lib/store/useWorkflowStore.ts`  
**Registry:** `src/registry/actions.tsx`  
**Server action:** `src/lib/actions.ts`

### O que é
Editor visual drag-and-drop de fluxos de trabalho (workflows) que define sequências de ações para processos produtivos.

### Função
Permite modelar visualmente o passo a passo da produção, conectando ações em uma sequência lógica. Utiliza **Zustand** para estado global e um **Action Registry** centralizado como catálogo de ações disponíveis.

---

### 9.1 Listagem de Workflows

**Rota:** `/admin/production/workflows`  
**Arquivo:** `src/app/admin/production/workflows/page.tsx`

#### Funcionalidades

| Funcionalidade | Descrição | API |
|---|---|---|
| **Tabela de workflows** | Lista com nome, status (dot colorido), quantidade de steps, última atualização. | `GET /workflow?restaurantId=` |
| **Busca** | Filtro por nome de workflow ou estação. | — |
| **Filtro por status** | Dropdown: Todos / Ativo / Pausado / Rascunho. | — |
| **Publicar workflow** | Altera status para ACTIVE. | `PATCH /workflow/:id` |
| **Excluir workflow** | Remove workflow com confirmação. | `DELETE /workflow/:id` |
| **Configurar fluxo** | Navega para o editor visual do workflow (`/[id]`). | — |
| **Revalidação de cache** | Server action `refreshWorkflows()` → `revalidatePath('/admin/production/workflows')`. | — |

#### Componentes envolvidos
- `StatusBadge` → Renderiza status (draft/active/paused) com cores e animação.
- `@radix-ui/react-dropdown-menu` → Menu de ações por workflow.

---

### 9.2 Criação de Workflow

**Rota:** `/admin/production/workflows/new`  
**Arquivo:** `src/app/admin/production/workflows/new/page.tsx`

#### Funcionalidades

| Funcionalidade | Descrição | API |
|---|---|---|
| **Formulário de criação** | Campos: nome, versão, descrição, status. | `POST /workflow` |
| **Redirecionamento** | Após criar, redireciona para `/admin/production/workflows/[newId]` (editor visual). | — |

---

### 9.3 Editor Visual de Workflow

**Rota:** `/admin/production/workflows/[id]`  
**Arquivo:** `src/app/admin/production/workflows/[id]/page.tsx`

#### Layout: 3 painéis

```
┌─────────────────┬──────────────────────────────┬────────────────┐
│  AÇÕES          │  CANVAS                      │  CONFIGURAÇÃO  │
│  (arrastáveis)  │                              │  (step ativo)  │
│                 │  [Trigger]                   │                │
│  LOGIC          │     │                        │  Nome: ____    │
│  • CONDITION    │  [Step 1]                    │  Tipo: [select]│
│  • DELAY        │     │                        │  Config: ___   │
│                 │  [Step 2]  [+]               │                │
│  iPAAS          │     │                        │                │
│  • SCHEDULE     │  [Step 3]                    │                │
│  • TRANSFORM    │                              │                │
│  • JSON_PARSER  │                              │                │
│                 │                              │                │
│  INTEGRATIONS   │                              │                │
│  • WHATSAPP     │                              │                │
│  • GOOGLE_SHEETS│                              │                │
│  • DATABASE_QUERY│                             │                │
│  • WEBHOOK      │                              │                │
└─────────────────┴──────────────────────────────┴────────────────┘
```

#### Painel esquerdo — Ações disponíveis

Lista todas as actions do `ACTION_REGISTRY`, agrupadas por categoria, arrastáveis para o canvas.

| Categoria | Ações |
|---|---|
| **LOGIC** | CONDITION (IF/ELSE), DELAY (espera) |
| **iPaaS Tools** | SCHEDULE (agendador Cron), TRANSFORM (conversão de dados), JSON_PARSER |
| **INTEGRATIONS** | WHATSAPP (Business API), GOOGLE_SHEETS, DATABASE_QUERY, WEBHOOK |
| **FACILITIES** | INSPECT (inspeção), MAINTAIN (manutenção) |
| **SYSTEM** | APPLY_STANDARD (aplicar norma/compliance), REQUEST (chamada HTTP) |

#### Painel central — Canvas visual

| Elemento | Descrição |
|---|---|
| **Nó Trigger** | Fixo no topo. Label: "New Process". Representa o início do fluxo. |
| **Nós de Step** | Renderizados dinamicamente da store. Conectados sequencialmente via linhas. |
| **Botão "+"** | No final da cadeia, adiciona novo step. |
| **Clique no step** | Seleciona o step e abre suas propriedades no painel direito. |

#### Painel direito — Configuração do step

Renderiza campos dinâmicos baseados na definição da action no registry:
- **`<select>`** se a action define `fields` com opções (ex: método de envio, tipo de transformação).
- **`<input>`** se o campo é de texto livre (ex: endpoint URL, mensagem).

#### Store Zustand (`useWorkflowStore`)

```typescript
interface WorkflowStep {
  id: string;
  actionType: string;
  config: Record<string, any>;
  category: string;
  nextStepId: string | null;
}

interface WorkflowStore {
  steps: WorkflowStep[];
  selectedStepId: string | null;
  setSteps: (steps: WorkflowStep[]) => void;
  setSelectedStepId: (id: string | null) => void;
  addStep: (actionType: string) => void;
  updateStepConfig: (stepId: string, config: Record<string, any>) => void;
  removeStep: (stepId: string) => void;
}
```

| Método | Comportamento |
|---|---|
| `addStep(actionType)` | Cria step com UUID, obtém `config` e `category` padrão do `ACTION_REGISTRY`. Linka o step anterior a este via `nextStepId`. |
| `removeStep(stepId)` | Remove o step e religa o anterior ao próximo (se existirem). |
| `updateStepConfig(stepId, config)` | Faz merge do novo config no step. |
| `setSelectedStepId(id)` | Controla qual step está aberto no painel de configuração. |

#### Salvamento

| Ação | Descrição | API |
|---|---|---|
| **Salvar** | Envia array de steps atualizado para o backend. | `PATCH /workflow/:id` |

---

### 9.4 Workflow Teste

**Rota:** `/admin/production/workflows/teste`  
**Arquivo:** `src/app/admin/production/workflows/teste/page.tsx`

Protótipo independente do editor visual com dados mock e action registry simplificado.

| Trigger types | Action components |
|---|---|
| ORDER_CREATED | PREPARE |
| SCHEDULED | GRILL |
| WEBHOOK | ASSEMBLE |
| — | PACK |

### Como chamar

```
GET    /admin/production/workflows              → Listar workflows
GET    /admin/production/workflows/new          → Criar workflow
GET    /admin/production/workflows/<id>         → Editor visual
GET    /admin/production/workflows/teste        → Protótipo (teste)
```

---

## 10. Gestão de Funcionários

**Rota:** `/admin/employees`  
**Arquivo:** `src/app/admin/employees/page.tsx`

### O que é
Módulo de gerenciamento da equipe da cafeteria.

### Função
Visualizar e gerenciar os funcionários, suas funções e alocações.

### Funcionalidades

| Funcionalidade | Descrição |
|---|---|
| **Cards de funcionário** | Nome, cargo, estação alocada, badge de status (ativo/inativo). |
| **Adicionar funcionário** | Botão "Add Employee" (sem modal implementada). |

### Como chamar

```
GET /admin/employees   → Gerenciar funcionários
```

---

## 11. Inventário / Insumos

**Rota:** `/admin/inventory`  
**Arquivo:** `src/app/admin/inventory/page.tsx`

### O que é
Controle de insumos e materiais de consumo da operação.

### Função
Acompanhar itens críticos e taxa de rotatividade de estoque.

### Funcionalidades

| Funcionalidade | Descrição |
|---|---|
| **Tabela de insumos** | Nome, estoque atual, threshold mínimo, botão "Adjust". |
| **Quick stats** | Itens críticos (count), stock turnover (indicador). |

### Como chamar

```
GET /admin/inventory   → Controle de insumos
```

---

## 12. Manutenção de Ativos

**Rota:** `/admin/maintenance`  
**Arquivo:** `src/app/admin/maintenance/page.tsx`

### O que é
Gestão de manutenção de equipamentos e ativos físicos.

### Função
Monitorar saúde dos equipamentos, agendar manutenções e registrar falhas.

### Funcionalidades

| Funcionalidade | Descrição |
|---|---|
| **Cards de estatísticas** | 4 indicadores: Uptime, Itens Críticos, Horas de Operação, Consumo de Energia. |
| **Cards de ativos** | Nome, barra de saúde (health %), data do último serviço, data do próximo serviço. |
| **Ações por ativo** | "Log Errors" (registrar erro), "Open Ticket / Check-up" (abrir chamado). |

### Como chamar

```
GET /admin/maintenance   → Manutenção de ativos
```

---

## 13. Métricas e BI

**Rota:** `/admin/metrics`  
**Arquivo:** `src/app/admin/metrics/page.tsx`

### O que é
Painel de Business Intelligence com indicadores de desempenho.

### Função
Visualizar KPIs do negócio com tendências e gráficos.

### Funcionalidades

| Funcionalidade | Descrição |
|---|---|
| **KPIs** | 4 cards: Tempo Médio de Produção, Eficiência por Estação, Volume de Vendas, Produções Ativas. Cada um com seta de tendência (↑/↓). |
| **Gráfico de barras** | Placeholder: produção × tempo. |
| **Gráfico de donut** | Placeholder: vendas por categoria. |

### Como chamar

```
GET /admin/metrics   → Painel de métricas e BI
```

---

## 14. IA Manager

**Rota:** `/admin/ai-manager`  
**Arquivo:** `src/app/admin/ai-manager/page.tsx`

### O que é
Módulo de inteligência artificial para automação de processos gerenciais.

### Função
Automatizar compras, auditoria de qualidade, manutenção preditiva e geração de relatórios operacionais.

### Funcionalidades

| Funcionalidade | Descrição |
|---|---|
| **Auto-Procurement & Suppliers** | Card com conceito de negociação autônoma com fornecedores e reposição inteligente de estoque. |
| **Quality Audit** | Card com conceito de integração de visão computacional para auditoria de qualidade. |
| **Asset Health** | Card com conceito de manutenção preditiva baseada em dados dos ativos. |
| **Daily Closing Report** | Relatório diário de fechamento com preview em estilo WhatsApp (mockup de celular). |
| **Force Send** | Botão para disparar relatório, com estados de loading e sucesso. |
| **Channel Config** | Configuração de canal: WhatsApp, Email. |

### Como chamar

```
GET /admin/ai-manager   → Gestão de IA
```

---

## 15. Normas e Compliance

**Rotas:** `/admin/standards`, `/admin/standards/new`  
**Arquivos:** `src/app/admin/standards/*`

### O que é
Sistema de gestão de normas de qualidade, certificações e compliance regulatório.

### Função
Gerenciar conformidade com múltiplos frameworks de qualidade e sustentabilidade.

### Funcionalidades

| Funcionalidade | Descrição |
|---|---|
| **Header** | Badges "GLOBAL COMPLIANCE ENGINE" e "ESG READY". |
| **Grid de frameworks** | Cards expansíveis organizados por categoria: |
| — ISO 9001 | Gestão da Qualidade |
| — ISO 14001 | Gestão Ambiental |
| — ISO 45001 | Saúde e Segurança Ocupacional |
| — ISO 41001 | Gestão de Facilities |
| — ISO 27001 | Segurança da Informação |
| — NR / AVCB / NBR | Normas Regulamentadoras Brasileiras |
| — ISO 55001 | Gestão de Ativos |
| — ISO 50001 | Gestão de Energia |
| — LEED / BREEAM / WELL | Certificações de Sustentabilidade |
| **Sidebar de filtro** | Filtro por tipo de norma. |
| **Fila de auditoria** | Cards de tarefas de compliance com status. |
| **Compliance scoring** | Card com pontuação geral de conformidade. |

### Como chamar

```
GET /admin/standards        → Gestão de normas e compliance
GET /admin/standards/new    → Criar novo padrão
```

---

## 16. Componentes Compartilhados

### Navbar

**Arquivo:** `src/components/Navbar.tsx`

| O que é | Função |
|---|---|
| Barra de navegação superior | Exibe logo Redcoffe à esquerda, ícone de configurações, perfil do usuário e botão de logout (`signOut({ callbackUrl: "/login" })`) à direita. Utilizada pelo layout `(protected)/layout.tsx`. |

### StatusBadge

**Arquivo:** `src/components/StatusBadge.tsx`

| O que é | Função |
|---|---|
| Componente reutilizável de badge de status | Renderiza label com cor correspondente (draft=amarelo, active=verde, paused=cinza), dot indicador e animação CSS opcional. |

### Action Registry

**Arquivo:** `src/registry/actions.tsx`

| O que é | Função |
|---|---|
| Catálogo centralizado de ações de workflow | Define para cada ação: `label`, `category`, `icon`, `desc`, `config` (valores padrão), `fields` (opções para dropdowns). Consumido pelo editor visual de workflows. |

### Workflow Store (Zustand)

**Arquivo:** `src/lib/store/useWorkflowStore.ts`

| O que é | Função |
|---|---|
| Store Zustand do editor de workflows | Gerencia `steps[]`, `selectedStepId`, e métodos: `setSteps`, `setSelectedStepId`, `addStep`, `updateStepConfig`, `removeStep`. O método `addStep` consulta o `ACTION_REGISTRY` para obter config/category padrão. O método `removeStep` faz auto-relink dos steps adjacentes. |

### Server Action

**Arquivo:** `src/lib/actions.ts`

| O que é | Função |
|---|---|
| Server action `refreshWorkflows()` | Chama `revalidatePath('/admin/production/workflows')` para invalidar cache do Next.js após operações de publish/delete. |

---

## 17. APIs Externas (Backend NestJS)

**URL base:** `http://192.168.1.10:3000` (configurado em `NEXT_PUBLIC_API_URL`)

**Autenticação:** Todas as requisições incluem header `Authorization: Bearer <accessToken>` obtido da sessão NextAuth.

### Endpoints

| Endpoint | Método | Funcionalidade | Utilizado por |
|---|---|---|---|
| `/auth/login` | POST | Autenticação de usuário (email + password) | NextAuth CredentialsProvider |
| `/product` | GET | Listar todos os produtos | Products list page |
| `/product` | POST | Criar novo produto | Products new page |
| `/product/:id` | GET | Obter detalhe do produto | Products update page |
| `/product/:id` | PATCH | Atualizar produto | Products update page |
| `/product/:id` | DELETE | Excluir produto | Products update page |
| `/inventory` | GET | Listar inventário | Stock list page |
| `/inventory/:id` | GET | Detalhe do item | Stock detail page |
| `/inventory/:id` | PATCH | Atualizar thresholds | Stock detail page |
| `/stockmovement/inventory/:id` | GET | Histórico de movimentações | Stock detail page |
| `/workflow?restaurantId=` | GET | Listar workflows | Workflows list page |
| `/workflow` | POST | Criar workflow | Workflows new page |
| `/workflow/:id` | PATCH | Atualizar steps / publicar | Workflow editor + list |
| `/workflow/:id` | DELETE | Excluir workflow | Workflows list page |
| `/station?restaurantId=` | GET | Listar estações | Stations page |
| `/station` | POST | Criar estação | Stations page |
| `/production-order` | GET | Listar ordens de produção | Production Kanban page |
| `/production-order/:id/advance` | PATCH | Avançar ordem para próxima estação | Production Kanban page |
| `/production-order/:id/complete` | PATCH | Completar ordem | Production Kanban page |

### Padrão de chamada

```typescript
const session = useSession();
const token = session.data?.user?.accessToken;

fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`, {
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});
```

---

## 18. Variáveis de Ambiente

**Arquivo:** `.env`

| Variável | Valor (exemplo) | Função |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | `http://192.168.1.10:3000` | URL base da API NestJS |
| `NEXTAUTH_URL` | `http://192.168.1.10:4000` | URL base da aplicação para NextAuth |
| `NEXTAUTH_SECRET` | — | Chave secreta para assinatura dos tokens JWT |

---

## 19. Arquitetura em Camadas

```
src/
├── app/                          # Next.js App Router
│   ├── globals.css               # Estilos globais (Tailwind v4)
│   ├── layout.tsx                # Layout raiz (fonts, Providers)
│   ├── page.tsx                  # Home (cardápio mock)
│   ├── providers.tsx             # SessionProvider
│   ├── middleware.ts             # Proteção de rotas
│   ├── (auth)/                   # Rotas públicas de autenticação
│   │   ├── login/
│   │   ├── register/
│   │   └── forgot-password/
│   ├── (protected)/              # Rotas protegidas
│   │   └── pdv/
│   ├── admin/                    # Módulo administrativo
│   │   ├── layout.tsx            # Sidebar + header
│   │   ├── page.tsx              # Dashboard
│   │   ├── production/           # Kanban, estações, workflows
│   │   ├── products/             # CRUD produtos
│   │   ├── stock/                # Estoque e movimentações
│   │   ├── suppliers/            # Fornecedores
│   │   ├── employees/            # Funcionários
│   │   ├── inventory/            # Insumos
│   │   ├── maintenance/          # Manutenção de ativos
│   │   ├── metrics/              # BI e KPIs
│   │   ├── ai-manager/           # IA Manager
│   │   └── standards/            # Normas e compliance
│   └── api/
│       └── auth/[...nextauth]/   # NextAuth handler
├── components/                   # Componentes compartilhados
│   ├── Navbar.tsx
│   └── StatusBadge.tsx
├── lib/
│   ├── actions.ts                # Server actions
│   └── store/
│       └── useWorkflowStore.ts   # Zustand store
└── registry/
    └── actions.tsx               # Action registry
```

### Fluxo de dados

```
Usuário (Browser)
  │
  ├── Next.js App Router (src/app/)
  │     ├── Páginas renderizam componentes React
  │     ├── Server Components (quando possível)
  │     └── Client Components (quando necessário: estado, efeitos, hooks)
  │
  ├── Autenticação
  │     └── NextAuth.js → CredentialsProvider → Backend NestJS
  │
  ├── Estado (Zustand) — apenas workflow editor
  │     └── useWorkflowStore → estado local do editor
  │
  └── API Calls
        └── fetch() + JWT → Backend NestJS (192.168.1.10:3000)
              └── PostgreSQL / SQL Database
```

---

## 20. Índice de Arquivos Principais

| Arquivo | Propósito |
|---|---|
| `src/middleware.ts` | Proteção de rotas autenticadas |
| `src/app/layout.tsx` | Layout raiz (fontes Geist, Providers) |
| `src/app/providers.tsx` | SessionProvider do NextAuth |
| `src/app/page.tsx` | Home page (cardápio mock) |
| `src/app/api/auth/[...nextauth]/route.ts` | Handler NextAuth com credentials |
| `src/app/(auth)/login/page.tsx` | Página de login |
| `src/app/(auth)/register/page.tsx` | Página de registro |
| `src/app/(auth)/forgot-password/page.tsx` | Recuperação de senha (email) |
| `src/app/(auth)/forgot-password/verify-code/page.tsx` | Verificação de código |
| `src/app/(auth)/forgot-password/reset-password/page.tsx` | Redefinição de senha |
| `src/app/(protected)/pdv/page.tsx` | PDV / Ponto de Venda |
| `src/app/admin/layout.tsx` | Sidebar + header do admin |
| `src/app/admin/page.tsx` | Dashboard administrativo |
| `src/app/admin/production/page.tsx` | Kanban de produção |
| `src/app/admin/production/stations/page.tsx` | Estações de produção |
| `src/app/admin/production/workflows/page.tsx` | Listagem de workflows |
| `src/app/admin/production/workflows/new/page.tsx` | Criação de workflow |
| `src/app/admin/production/workflows/[id]/page.tsx` | Editor visual de workflow |
| `src/app/admin/production/workflows/teste/page.tsx` | Protótipo do editor |
| `src/app/admin/products/page.tsx` | Listagem de produtos |
| `src/app/admin/products/new/page.tsx` | Criação de produto |
| `src/app/admin/products/update/page.tsx` | Edição de produto |
| `src/app/admin/stock/page.tsx` | Listagem de estoque |
| `src/app/admin/stock/new/page.tsx` | Movimentação de estoque |
| `src/app/admin/stock/[id]/page.tsx` | Detalhe do item de estoque |
| `src/app/admin/suppliers/page.tsx` | Gestão de fornecedores |
| `src/app/admin/employees/page.tsx` | Gestão de funcionários |
| `src/app/admin/inventory/page.tsx` | Controle de insumos |
| `src/app/admin/maintenance/page.tsx` | Manutenção de ativos |
| `src/app/admin/metrics/page.tsx` | Métricas e BI |
| `src/app/admin/ai-manager/page.tsx` | IA Manager |
| `src/app/admin/standards/page.tsx` | Normas e compliance |
| `src/app/admin/standards/new/page.tsx` | Criar novo padrão |
| `src/components/Navbar.tsx` | Barra de navegação superior |
| `src/components/StatusBadge.tsx` | Badge de status reutilizável |
| `src/lib/actions.ts` | Server actions (revalidatePath) |
| `src/lib/store/useWorkflowStore.ts` | Store Zustand do editor de workflows |
| `src/registry/actions.tsx` | Catálogo centralizado de ações de workflow |
