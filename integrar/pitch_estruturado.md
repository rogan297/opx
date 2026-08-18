# Pitch de Negócio — Plataforma de Adoção de IA em Processos

**Produto:** Plataforma profissional de modelagem, auditoria, métricas e inteligência artificial para processos operacionais.
**Mercado:** Multissetorial (food service, manufatura, logística, saúde, varejo, compliance)
**Categoria:** AI Readiness & Process Intelligence Platform

---

## 1. A Tese Central

### O Problema Real

Empresas querem adotar IA, mas esbarram em uma verdade incômoda:

> **IA sem processo modelado é inferência sobre caos.**

Antes de aplicar IA a qualquer operação, é preciso:
1. **Modelar** o processo (como ele funciona hoje)
2. **Torná-lo auditável** (quem fez o quê, quando, por quê)
3. **Extrair métricas reais** (gargalos, tempos, desvios, custos)
4. **Aplicar IA** (automação, predição, agentes, visão computacional)

O mercado está cheio de ferramentas que fazem apenas uma dessas etapas. Não existe uma plataforma única que conduza essa jornada completa — da modelagem visual à execução inteligente.

### A Hipótese

> Organizações de todos os setores precisam de uma plataforma técnica e profissional para modelar, auditar, medir e evolucionar seus processos operacionais até a adoção plena de inteligência artificial. Esta plataforma não é um SGE/ERP (que gerencia recursos), nem um BPM tradicional (pesado e dependente de TI), nem um iPaaS low-code (rasteiro). É uma nova categoria: **AI Readiness & Process Intelligence**.

### Por que isso não é um SGE

| | SGE / ERP | Nossa Plataforma |
|---|---|---|
| **O que gerencia** | Recursos (financeiro, estoque, RH) | Processos (fluxo, etapas, estação a estação) |
| **Quem usa** | Administrativo / Financeiro | Operação / Chão de fábrica / Chef / Logística |
| **Auditoria** | Extrato contábil | Rastreabilidade completa de cada execução (quem, onde, quando, quanto tempo) |
| **Workflows** | Rígidos, pré-programados | Customizáveis, drag-and-drop técnico, multi-step |
| **IA** | Inexistente ou marginal | Núcleo: agentes, predição, visão computacional, automação |
| **Flexibilidade setorial** | Vertical (um módulo por setor) | Horizontal (qualquer processo de qualquer setor) |

---

## 2. A Jornada de AI Adoption (4 Níveis)

A plataforma acompanha a maturidade do cliente em 4 estágios:

```
Nível 1: Modelar
  └── Designer visual de workflows (ações lógicas, condições, transformações)
  └── Registro centralizado de ações (Action Registry)
  └── Workflows versionados com status (DRAFT → ACTIVE → PAUSED → ERROR)

Nível 2: Auditar
  └── Rastreabilidade total: toda execução tem dono, estação, timestamp
  └── Trilha de auditoria imutável (stock movements, produção, filas)
  └── Compliance integrado (ISO 9001, 14001, 45001, 27001, NRs, LEED)
  └── Módulo de normas com seções e requisitos auditáveis

Nível 3: Medir
  └── BI e Métricas: tempo médio de produção, eficiência por estação, gargalos
  └── Dashboard com KPIs em tempo real
  └── Relatórios de fechamento automáticos (Daily Closing Report)
  └── Histórico completo para análise de tendências e capacidade

Nível 4: Inteligência
  └── Auto-Procurement: reposição inteligente de insumos com IA
  └── Quality Audit: visão computacional para auditoria de qualidade
  └── Predictive Maintenance: saúde de ativos + manutenção preditiva
  └── Agentes autônomos em cada etapa do workflow
```

---

## 3. Arquitetura Técnica (Diferencial Profissional)

| Camada | Tecnologia | Função |
|--------|-----------|--------|
| **Frontend** | Next.js 16 + React 19 + TypeScript + Tailwind CSS 4 | Interface profissional, SSR, App Router |
| **Backend** | NestJS 11 + TypeScript 5.7 | API RESTful modular, 55+ endpoints |
| **ORM** | Prisma 7 + PostgreSQL | Dados estruturados, multi-tenancy nativo |
| **Mensageria** | RabbitMQ | Filas assíncronas, eventos de inventário, desacoplamento |
| **Autenticação** | JWT + Argon2 + Passport.js | RBAC granular por papéis, multi-restaurante/tenant |
| **IA** | Integração com modelos de linguagem + visão computacional | Agentes, predição, automação |

### Multi-tenancy por Design

Cada entidade do sistema carrega `tenantId`, garantindo isolamento total entre organizações — essencial para operações B2B profissionais.

---

## 4. Personas Técnicas

### Persona 1: Diretor de Operações / COO
- **Contexto:** Responde por eficiência operacional de múltiplas unidades
- **Dor:** Não consegue comparar desempenho entre unidades, processos são inconsistentes, não sabe onde aplicar IA primeiro
- **O que busca:** Uma plataforma que modele o processo ideal, audite a execução real, e aponte onde IA gera mais retorno
- **Objeção:** "Já investimos em ERP, não quero mais uma ferramenta"

### Persona 2: Head de Inovação / TI
- **Contexto:** Responsável por adoção de IA na organização
- **Dor:** Times de negócio querem IA mas os processos não estão preparados — dados sujos, fluxos não documentados, sem rastreabilidade
- **O que busca:** Uma ferramenta técnica que engenheiros e analistas de processos possam usar para preparar o terreno para IA
- **Objeção:** "Por que não usar n8n/Make + banco + relatório?"

### Persona 3: Especialista em Qualidade / Compliance
- **Contexto:** Auditorias ISO, vigilância sanitária, normas regulamentadoras
- **Dor:** Processos são auditados no papel, sem rastreabilidade digital, corre atrás de evidências na véspera da auditoria
- **O que busca:** Rastreabilidade imutável, workflow auditável, geração automática de relatórios de conformidade
- **Objeção:** "Sistemas de qualidade são muito caros para o que oferecem"

---

## 5. Concorrência por Nicho

### Análise por Estágio da Jornada

| Estágio | Concorrente | Diferença do OPX |
|---------|------------|-------------------|
| **Modelar** | Camunda, Signavio (SAP) | Pesados, dependem de TI, não executam — só modelam |
| **Auditar** | Sistemas ISO / Compliance | Só cobrem compliance, não modelam nem medem |
| **Medir** | Tableau, Power BI, Metabase | Só visualizam dados existentes, não geram os dados do processo |
| **IA** | n8n, Make, Zapier | Automação técnica (iPaaS), não pensam em processo de negócio + auditoria |
| **Tudo** | ERP (Totvs, SAP, Linx) | Gerenciam recursos, não processos. Rígidos, verticais |

### O Mapa do Vazio

```
                        AUDITA
                    ┌──────────┐
                    │          │
                    │  OPX     │
                    │          │
          MODELA ───┤ PLATFORM ├─── MEDE
                    │          │
                    │          │
                    └──────────┘
                    APLICA IA
```

Nenhuma plataforma ocupa esse quadrante. Ou você modela (BPM pesado), ou você audita (sistemas de qualidade caros), ou você mede (BI genérico), ou você automatiza (iPaaS raso). Ninguém faz os **quatro estágios da adoção de IA** em uma plataforma única.

---

## 6. Modelo de Negócio

### Receita (SaaS Técnico)

| Plano | Preço Sugerido | Público |
|-------|---------------|---------|
| **Pro** (modelar + auditar + medir, 1 tenant) | R$ 597/mês | Média empresa / unidade |
| **Enterprise** (tudo + IA + multi-tenant) | R$ 1.997/mês | Redes, franquias, grupos |
| **On-Premise / Private Cloud** | Sob consulta | Indústria, saúde, governo |
| **Implementação** (setup + integração + treinamento) | R$ 5.000-15.000 one-time | Todos |

### Custos

| Item | Estimativa |
|------|-----------|
| Infraestrutura (cloud + banco + fila) | ~R$ 500-2.000/mês por cliente enterprise |
| Modelos de IA (API tokens) | Variável conforme uso |
| Equipe (manutenção + suporte) | 2-4 pessoas |
| Vendas | Indireto (consultoria, parceiros) + direto |

### Mercado Endereçável

- **Brasil:** Estima-se 1,5M+ médias empresas que poderiam se beneficiar de IA em processos
- **TAM mundial:** Mercado global de Process Intelligence / AI Readiness — categoria emergente, projeção de US$ 15B+ até 2028
- **Preço justo:** R$ 600-2.000/mês é significativamente menor que BPM tradicional (R$ 5-20k/mês) ou ERP

---

## 7. Roadmap de Validação (90 Dias)

### Sprint 1 — Hipóteses (Dias 1-30)
- [ ] 10 entrevistas com diretores de operação / TI / qualidade
- [ ] Validar: "Sua empresa quer adotar IA? O que falta? Como está o processo hoje?"
- [ ] Landing page profissional com whitepaper técnico
- [ ] Mapear 10 concorrentes indiretos (BPM, iPaaS, Quality, BI)

### Sprint 2 — Piloto Técnico (Dias 31-60)
- [ ] Onboard 2-3 clientes pagantes com desconto (não gratuitos)
- [ ] Foco em processo real de um setor (ex: restaurante + logística)
- [ ] Coletar: tempo de setup, features mais usadas, dados gerados
- [ ] Testar Nível 1 a 3 (Modelar → Auditar → Medir)

### Sprint 3 — IA + Validação Comercial (Dias 61-90)
- [ ] Ativar Nível 4 (IA) com 1 caso de uso real
- [ ] Documentar case de sucesso com métricas (ex: "reduziu 30% de desperdício")
- [ ] Ajustar precificação com base nos pilotos
- [ ] Decidir canal de vendas: direto, consultorias, marketplaces?

---

## 8. Hipóteses Para Validar (Versão Final)

### 🔴 Problema
| # | Hipótese |
|---|----------|
| H1 | Empresas querem adotar IA mas os processos operacionais não estão preparados (nem modelados, nem auditáveis, nem mensuráveis) |
| H2 | Ferramentas atuais são fragmentadas: modela com uma, audita com outra, mede com outra, IA com outra — e elas não conversam |
| H3 | SGE/ERP não resolvem porque gerenciam recursos, não processos |
| H4 | BPM tradicional é pesado demais para a média empresa |

### 🟡 Solução
| # | Hipótese |
|---|----------|
| H5 | Uma plataforma única que cobre os 4 estágios tem mais valor que a soma das partes |
| H6 | A jornada progressiva (modelar → auditar → medir → IA) reduz atrito na adoção |
| H7 | Workflows visuais mas técnicos (action registry, lógica, transformações) atraem times de operação e TI |
| H8 | O compliance integrado (ISO, NRs) acelera decisão de compra |

### 🟢 Negócio
| # | Hipótese |
|---|----------|
| H9 | Mercado paga R$ 600-2.000/mês por uma plataforma profissional de AI Readiness |
| H10 | O TAM é grande o suficiente para justificar abordagem horizontal (multissetorial) |
| H11 | O canal de vendas mais eficaz é consultorias de processos e inovação |
| H12 | O case de sucesso de um setor gera tração orgânica em outros setores |

---

## 9. Categorização Final

**Não é:**
- ❌ Um SGE / ERP ("sistema de gestão empresarial")
- ❌ Um BPM tradicional (Business Process Management)
- ❌ Um Low-code / No-code genérico
- ❌ Um sistema de auditoria isolado
- ❌ Um software de BI

**É:**
- ✅ **AI Readiness Platform** — prepara e evolui processos para inteligência artificial
- ✅ **Process Intelligence Platform** — modela, audita, mede e inteligencia processos operacionais
- ✅ **A camada técnica entre a operação e a IA**

---

## 10. Narrativa do Pitch (2 minutos | Tom profissional)

**Abertura:**
> "Toda empresa hoje quer IA. Mas 80% dos projetos de IA falham porque os processos operacionais não estão preparados. Não adianta colocar IA em cima de caos."

**O Problema:**
> "O mercado trata isso como um problema de tecnologia. Não é. É um problema de processo. Você precisa modelar, auditar e medir antes de inteligir. E não existe uma plataforma que faça isso — você precisa de 4 ferramentas que não conversam entre si."

**A Solução:**
> "Nossa plataforma conduz a jornada completa de AI Readiness: do modelo visual do processo à execução auditável, das métricas reais aos agentes de IA. Tudo em uma plataforma técnica, profissional e multissetorial. O workflow designer, a trilha de auditoria, o BI operacional e os módulos de IA — integrados por design."

**Diferenciais:**
> "Não é BPM (pesado), não é iPaaS (raso), não é ERP (recurso). É a primeira plataforma que conecta os 4 estágios que uma organização precisa percorrer para adotar IA de verdade."

**Chamada:**
> "Estou procurando 2-3 empresas que estão no início dessa jornada e querem ser as primeiras a ter uma plataforma completa de AI Readiness. Interessados?"
