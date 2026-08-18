# Roteiro YouTube — Plataforma OPX

**Vídeo:** "Por que 80% dos projetos de IA falham (e o que fazer)"
**Formato:** Talking head + screen recording do produto
**Duração estimada:** 8-12 minutos
**Tom:** Profissional, direto, didático
**Baseado em:** `pitch_estruturado.md`

---

## 🎬 CENA 1 — GANCHO (0:00 - 0:45)

**Visual:** Você na tela, fundo clean. Legenda no canto: "O dado que ninguém fala"

**VOCÊ:**
> "Toda empresa hoje quer IA. O CEO chega segunda-feira e fala: 'Quero inteligência artificial na operação até o fim do trimestre.'"
>
> Corta. Três meses depois, não deu certo. O fornecedor de IA entregou um modelo que não funciona com os dados reais. A equipe de operação não confia. O projeto morre.
>
> Isso não é exceção. É a regra. **80% dos projetos de IA falham.** E não é por causa da tecnologia."

**Tela preta, texto centralizado:**
> "80% dos projetos de IA falham"
> — Gartner, 2024

**VOCÊ:**
> "O motivo é simples: **IA sem processo modelado é inferência sobre caos.**"

---

## 🎬 CENA 2 — O PROBLEMA (0:45 - 2:30)

**Visual:** Split screen — você + tela com bullets aparecendo

**VOCÊ:**
> "Quando uma empresa decide adotar IA, ela geralmente faz a pergunta errada. Pergunta 'qual modelo de IA usar?' em vez de 'meu processo está pronto para receber IA?'"

**Transição para tela cheia — aparece um diagrama:**

```
Processo Real
     │
     ▼
  [Caixa-Preta]
     │
     ▼
  IA → Resultado: ❌
```

**VOCÊ:**
> "IA não é mágica. Um modelo de machine learning, um agente autônomo, visão computacional — todos precisam de três coisas que a maioria das empresas não tem:

1. **O processo modelado** — ninguém sabe o fluxo real, só o 'ideal' que existe no manual
2. **Rastreabilidade** — quando algo dá errado, não dá pra saber quem fez o quê, quando
3. **Métricas reais** — não há dados limpos e estruturados sobre gargalos, tempos, desvios"

**Volta pra você:**
> "O mercado trata isso como um problema de tecnologia. Não é. É um problema de processo. E não existe uma plataforma que resolva os dois lados."

---

## 🎬 CENA 3 — O FRAMEWORK: 4 NÍVEIS (2:30 - 6:00)

**Visual:** Tela com diagrama aparecendo progressivamente. Animação simples.

**VOCÊ:**
> "Existe uma jornada que qualquer organização precisa percorrer para adotar IA de forma responsável. São 4 níveis. E pular etapas é a receita para o fracasso."

**Animação na tela — Nível 1 aparece:**

### 📍 NÍVEL 1 — MODELAR

**VOCÊ:**
> "Antes de qualquer coisa, você precisa **modelar o processo.** Não num PowerPoint bonito que fica desatualizado em uma semana. Num ambiente profissional, visual, versionado."

**Screen recording** (do workflow designer):
> "Aqui na plataforma, você desenha o fluxo real da operação. Cada ação, cada condição, cada transformação. Visual, drag-and-drop, mas técnico — não é low-code raso. Você define triggers, condições, integrações."

**Animação — Nível 2 aparece ao lado:**

### 📍 NÍVEL 2 — AUDITAR

**VOCÊ:**
> "Com o processo modelado, toda execução passa a ser rastreada. Cada ação tem dono, estação, timestamp. Uma trilha de auditoria imutável."

**Display do módulo de compliance:**
> "Isso não é só bom senso — é compliance. ISO 9001, 14001, 27001, NRs. Se você passa por auditoria, sabe o pesadelo que é correr atrás de evidências na véspera. Aqui, a auditoria é um subproduto da operação."

**Animação — Nível 3 aparece:**

### 📍 NÍVEL 3 — MEDIR

**VOCÊ:**
> "Com processos rodando e sendo auditados, os dados gerados são reais. Agora você pode medir: tempo médio de produção, eficiência por estação, gargalos, tendências. Em tempo real, dashboard limpo, sem planilha."

**Screen recording do dashboard:**
> "Esse é o BI operacional. Mas diferente de Power BI ou Tableau, ele não precisa de ingestão de dados externa — os dados são gerados pelo próprio processo. É a diferença entre um raio-X e uma foto."

**Animação — Nível 4 aparece fechando o quadrado:**

### 📍 NÍVEL 4 — INTELIGÊNCIA

**VOCÊ:**
> "Agora sim. Com processo modelado, auditável e mensurável, você pode aplicar IA com confiança."

**Screen recording do IA Manager:**
> "Reposição inteligente de insumos que aprende com o consumo real. Visão computacional para auditoria de qualidade. Manutenção preditiva baseada em dados históricos dos ativos. Agentes autônomos em cada etapa."

**Tela cheia — os 4 níveis lado a lado:**

```
┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
│ MODELAR  │→│ AUDITAR  │→│  MEDIR   │→│    IA    │
│          │  │          │  │          │  │          │
│ Visual   │  │ Trilha   │  │ KPIs     │  │ Agentes  │
│ Designer │  │ Imutável │  │ BI       │  │ Preditiva│
│ Registry │  │ ISO/NR   │  │ Gatilhos │  │ Automação│
└──────────┘  └──────────┘  └──────────┘  └──────────┘
```

**VOCÊ:**
> "Cada nível se apoia no anterior. Você não audita o que não modelou. Não mede o que não auditou. Não aplica IA no que não mediu. Parece óbvio. E é. Mas 80% das empresas tentam pular direto pro nível 4."

---

## 🎬 CENA 4 — POR QUE AS FERRAMENTAS EXISTENTES NÃO RESOLVEM (6:00 - 8:30)

**Visual:** Você na tela, tela dividida com tabela comparativa

**VOCÊ:**
> "E por que as empresas pulam etapas? Porque não existe uma plataforma que cobre essa jornada completa. O que existe hoje são ferramentas fragmentadas."

**Tabela aparece na tela:**

| Ferramenta | Modela? | Audita? | Mede? | IA? |
|------------|---------|---------|-------|-----|
| BPM (Camunda/SAP) | ✅ | ❌ | ❌ | ❌ |
| ERP (Totvs/SAP) | ❌ | ✅ Recursos | ✅ Financeiro | ❌ |
| BI (Power BI/Tableau) | ❌ | ❌ | ✅ Dados existentes | ❌ |
| iPaaS (n8n/Make) | ❌ | ❌ | ❌ | ✅ Técnica |
| ISO/Compliance | ❌ | ✅ Papel | ❌ | ❌ |

**VOCÊ:**
> "Repare: cada ferramenta cobre um pedaço. Você modela o processo no Camunda, mas ele não executa — só modela. Você audita no sistema ISO, mas ele não conversa com o modelo do processo. Você mede no Power BI, mas só visualiza dados que já existem — não gera os dados do processo. Você automatiza no n8n, mas é automação técnica, não pensa em processo de negócio com auditoria."

**Diagrama do "Mapa do Vazio" — um quadrado com 4 quadrantes:**

```
                    AUDITA
                ┌──────────┐
                │          │
                │   OPX    │
                │          │
      MODELA ───┤ PLATFORM ├─── MEDE
                │          │
                │          │
                └──────────┘
                APLICA IA
```

**VOCÊ:**
> "Isso é o que eu chamo de **mapa do vazio.** Ninguém ocupa esse quadrante. E é exatamente onde fica a jornada de AI Readiness. Ou você modela (BPM pesado), ou você audita (sistemas ISO caros), ou você mede (BI genérico), ou você automatiza (iPaaS raso). Ninguém conecta os quatro estágios."

---

## 🎬 CENA 5 — O QUE É A PLATAFORMA (8:30 - 10:00)

**Visual:** Você na tela + screen recording mostrando a plataforma em ação

**VOCÊ:**
> "A plataforma que construímos nasce exatamente aqui: nesse espaço vazio entre modelar, auditar, medir e aplicar IA."

**Mostra rápido em sequência:**
- Workflow designer → arrastando ações
- Kanban de produção com ordens avançando
- Dashboard de métricas com KPIs
- IA Manager com auto-procurement, quality audit, asset health

**VOCÊ:**
> "Ela não é:
> - ❌ Um ERP — porque não gerencia recursos financeiros, gerencia **processos**
> - ❌ Um BPM tradicional — pesado, dependente de TI, só modela
> - ❌ Um iPaaS — automação rasteira sem contexto de negócio
> - ❌ Um BI — que só consome dados existentes

> Ela é **uma nova categoria:** AI Readiness & Process Intelligence. A camada técnica entre a operação e a inteligência artificial."

---

## 🎬 CENA 6 — PARA QUEM É ISSO (10:00 - 11:30)

**Visual:** Cards de persona aparecendo na tela

**VOCÊ:**
> "Se você é:

> **🧑‍💼 Diretor de Operações / COO** — que precisa comparar desempenho entre unidades, padronizar processos e saber onde IA gera mais retorno.

> **🧑‍💻 Head de Inovação / TI** — que ouve 'quero IA' do negócio, mas sabe que os processos são uma bagunça e não tem ferramenta para preparar o terreno.

> **👩‍🔬 Especialista em Qualidade / Compliance** — que ainda vive de planilhas e corre atrás de evidências na véspera da auditoria ISO.

> Essa plataforma foi feita para vocês."

---

## 🎬 CENA 7 — CALL TO ACTION (11:30 - 12:00)

**Visual:** Você na tela, texto de contato aparecendo

**VOCÊ:**
> "Aqui vai o convite direto:

> Estou procurando **2 a 3 empresas** que estão no começo dessa jornada — querem adotar IA, sabem que os processos precisam estar prontos, mas não encontraram a ferramenta certa.

> Empresas que topam ser piloto, com desconto, em troca de feedback real.

> Se você reconhece esse desafio na sua operação, me chama. Vamos modelar seu primeiro processo em 2 horas.

> **Links na descrição.**"

**Tela final — texto:**
> Plataforma OPX — AI Readiness & Process Intelligence

---

## 📝 NOTAS DE PRODUÇÃO

### Tom e Estilo
- Seguro, professor, que domina o assunto
- Evitar linguagem de startup genérica ("disruptivo", "revolucionário")
- Ser técnico mas didático

### Captions e Legendas
- Essenciais para o formato YouTube
- Legendas dinâmicas destacando palavras-chave em **negrito visual**

### Transições
- Limpas, sem firula
- Usar o diagrama dos 4 níveis como âncora visual que volta ao longo do vídeo

### Screen Recording
- Resolução mínima 1920×1080
- Mostrar o produto real — workflows, kanban, dashboard, IA manager
- Nada de mockup

### Possíveis Cortes para Shorts
| Short | Tema |
|-------|------|
| 1 | "80% dos projetos de IA falham" (gancho) |
| 2 | "Os 4 níveis para adotar IA" (framework) |
| 3 | "Por que ERP não resolve para IA" (concorrência) |

### Trilha Sonora
- Lo-fi instrumental ou cinematic sutil
- Nada muito animado (tema técnico/profissional)

---

## 📊 Storyboard Resumido

| Cena | Tempo | Conteúdo | Visual |
|------|-------|----------|--------|
| 1 | 0:00 — 0:45 | Gancho: 80% dos projetos de IA falham | Você + tela preta com dado |
| 2 | 0:45 — 2:30 | Problema: IA sem processo = caos | Diagrama caixa-preta |
| 3 | 2:30 — 6:00 | Framework: 4 níveis (Modelar → Auditar → Medir → IA) | Animação progressiva |
| 4 | 6:00 — 8:30 | Concorrência fragmentada | Tabela comparativa + mapa do vazio |
| 5 | 8:30 — 10:00 | A plataforma | Screen recording do produto |
| 6 | 10:00 — 11:30 | Personas | Cards de persona |
| 7 | 11:30 — 12:00 | CTA: 2-3 pilotos | Você + links |

---

## 🔗 Referências

- [Pitch Estruturado](pitch_estruturado.md)
- [Documentação do Frontend](frontend.md)
