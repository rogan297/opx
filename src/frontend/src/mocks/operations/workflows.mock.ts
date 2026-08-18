export type WorkflowStatus = "DRAFT" | "ACTIVE" | "PAUSED" | "ERROR";
export type StepActionType =
  | "PREPARE"
  | "MACHINE"
  | "ASSEMBLE"
  | "FINISH"
  | "PACK"
  | "EXPEDITE"
  | "CONDITION"
  | "DELAY"
  | "SCHEDULE"
  | "TRANSFORM"
  | "JSON_PARSER"
  | "WHATSAPP"
  | "GOOGLE_SHEETS"
  | "DATABASE_QUERY"
  | "WEBHOOK"
  | "INSPECT"
  | "MAINTAIN"
  | "APPLY_STANDARD"
  | "REQUEST";
export type StepCategory =
  | "ACTION"
  | "LOGIC"
  | "TRANSFORM"
  | "INTEGRATION"
  | "FACILITIES"
  | "SYSTEM";

export interface WorkflowStep {
  id: string;
  workflowId: string;
  actionType: StepActionType;
  category: StepCategory;
  label: string;
  config: Record<string, any>;
  stationId?: string;
  estimatedTime?: number;
  nextStepId: string | null;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  version: string;
  status: WorkflowStatus;
  steps: WorkflowStep[];
  createdAt: string;
  updatedAt: string;
}

export const ACTION_REGISTRY: Record<
  StepActionType,
  {
    label: string;
    category: StepCategory;
    icon: string;
    desc: string;
    fields?: {
      key: string;
      label: string;
      type: "text" | "select";
      options?: string[];
    }[];
    config: Record<string, any>;
  }
> = {
  PREPARE: {
    label: "Preparar",
    category: "ACTION",
    icon: "PackageOpen",
    desc: "Preparar ingredientes",
    fields: [
      {
        key: "station",
        label: "Estação",
        type: "select",
        options: ["Cozinha", "Churrasqueira", "Fritura"],
      },
    ],
    config: {},
  },
  MACHINE: {
    label: "Processar",
    category: "ACTION",
    icon: "Cog",
    desc: "Processo de cocção do alimento",
    fields: [
      { key: "tool", label: "Equipamento", type: "text" },
      { key: "temperature", label: "Temperatura (°C)", type: "text" },
    ],
    config: {},
  },
  ASSEMBLE: {
    label: "Montar",
    category: "ACTION",
    icon: "Package",
    desc: "Montar o prato final",
    fields: [
      { key: "components", label: "Componentes do prato", type: "text" },
    ],
    config: {},
  },
  FINISH: {
    label: "Finalizar",
    category: "ACTION",
    icon: "Paintbrush",
    desc: "Finalização do prato",
    fields: [
      {
        key: "process",
        label: "Processo",
        type: "select",
        options: ["Flambar", "Gratinar", "Empratar"],
      },
    ],
    config: {},
  },
  PACK: {
    label: "Embalar",
    category: "ACTION",
    icon: "Box",
    desc: "Embalar para delivery",
    fields: [
      {
        key: "packType",
        label: "Tipo de Embalagem",
        type: "select",
        options: ["Marmita", "Embalagem Delivery", "Saco Térmico"],
      },
    ],
    config: {},
  },
  EXPEDITE: {
    label: "Servir",
    category: "ACTION",
    icon: "Truck",
    desc: "Servir o pedido à mesa",
    config: {},
  },
  CONDITION: {
    label: "Condição",
    category: "LOGIC",
    icon: "GitBranch",
    desc: "IF/ELSE condicional",
    fields: [{ key: "condition", label: "Expressão", type: "text" }],
    config: {},
  },
  DELAY: {
    label: "Aguardar",
    category: "LOGIC",
    icon: "Timer",
    desc: "Aguardar um período",
    fields: [{ key: "duration", label: "Tempo (min)", type: "text" }],
    config: {},
  },
  SCHEDULE: {
    label: "Agendar",
    category: "TRANSFORM",
    icon: "Calendar",
    desc: "Agendar execução (Cron)",
    fields: [{ key: "cron", label: "Expressão Cron", type: "text" }],
    config: {},
  },
  TRANSFORM: {
    label: "Transformar",
    category: "TRANSFORM",
    icon: "ArrowLeftRight",
    desc: "Transformar dados",
    fields: [{ key: "mapping", label: "Mapeamento", type: "text" }],
    config: {},
  },
  JSON_PARSER: {
    label: "Parser JSON",
    category: "TRANSFORM",
    icon: "FileJson",
    desc: "Parsear dados JSON",
    fields: [{ key: "schema", label: "Schema", type: "text" }],
    config: {},
  },
  WHATSAPP: {
    label: "WhatsApp",
    category: "INTEGRATION",
    icon: "MessageSquare",
    desc: "Enviar notificação WhatsApp",
    fields: [
      { key: "template", label: "Template", type: "text" },
      { key: "to", label: "Destinatário", type: "text" },
    ],
    config: {},
  },
  GOOGLE_SHEETS: {
    label: "Planilha",
    category: "INTEGRATION",
    icon: "FileSpreadsheet",
    desc: "Registrar em planilha",
    fields: [{ key: "sheetId", label: "ID da Planilha", type: "text" }],
    config: {},
  },
  DATABASE_QUERY: {
    label: "Banco de Dados",
    category: "INTEGRATION",
    icon: "Database",
    desc: "Executar query SQL",
    fields: [{ key: "query", label: "SQL", type: "text" }],
    config: {},
  },
  WEBHOOK: {
    label: "Webhook",
    category: "INTEGRATION",
    icon: "Webhook",
    desc: "Chamar webhook externo",
    fields: [
      { key: "url", label: "URL", type: "text" },
      {
        key: "method",
        label: "Método",
        type: "select",
        options: ["GET", "POST", "PATCH", "DELETE"],
      },
    ],
    config: {},
  },
  INSPECT: {
    label: "Inspecionar",
    category: "FACILITIES",
    icon: "Search",
    desc: "Inspeção de qualidade",
    fields: [{ key: "criteria", label: "Critérios", type: "text" }],
    config: {},
  },
  MAINTAIN: {
    label: "Higienização",
    category: "FACILITIES",
    icon: "Wrench",
    desc: "Higienização programada",
    fields: [
      {
        key: "type",
        label: "Tipo",
        type: "select",
        options: ["Preventiva", "Corretiva"],
      },
    ],
    config: {},
  },
  APPLY_STANDARD: {
    label: "Aplicar Norma",
    category: "SYSTEM",
    icon: "ClipboardCheck",
    desc: "Aplicar norma de compliance",
    fields: [
      {
        key: "standardId",
        label: "Norma",
        type: "select",
        options: [
          "ANVISA RDC 216",
          "APPCC",
          "ISO 22000",
          "Vigilância Sanitária",
        ],
      },
    ],
    config: {},
  },
  REQUEST: {
    label: "HTTP Request",
    category: "SYSTEM",
    icon: "Globe",
    desc: "Chamada HTTP",
    fields: [
      { key: "url", label: "URL", type: "text" },
      {
        key: "method",
        label: "Método",
        type: "select",
        options: ["GET", "POST", "PUT", "DELETE"],
      },
    ],
    config: {},
  },
};

export const categoryIcons: Record<StepCategory, string> = {
  ACTION: "Cog",
  LOGIC: "GitBranch",
  TRANSFORM: "ArrowLeftRight",
  INTEGRATION: "Plug",
  FACILITIES: "Wrench",
  SYSTEM: "Settings",
};

export const MOCK_WORKFLOWS: Workflow[] = [
  {
    id: "wf1",
    name: "Preparo de Filé Mignon ao Molho Madeira",
    description: "Fluxo padrão para preparo do prato principal",
    version: "1.0",
    status: "ACTIVE",
    createdAt: "2026-06-01",
    updatedAt: "2026-07-15",
    steps: [
      {
        id: "ws1",
        workflowId: "wf1",
        actionType: "PREPARE",
        category: "ACTION",
        label: "Preparar Ingredientes",
        config: { station: "Cozinha" },
        stationId: "st1",
        estimatedTime: 2,
        nextStepId: "ws2",
      },
      {
        id: "ws2",
        workflowId: "wf1",
        actionType: "MACHINE",
        category: "ACTION",
        label: "Grelhar Filé",
        config: { tool: "Grelha Inox", temperature: "220" },
        nextStepId: "ws3",
      },
      {
        id: "ws3",
        workflowId: "wf1",
        actionType: "INSPECT",
        category: "FACILITIES",
        label: "Inspecionar Ponto da Carne",
        config: { criteria: "Cor, textura, temperatura interna" },
        nextStepId: "ws4",
      },
      {
        id: "ws4",
        workflowId: "wf1",
        actionType: "CONDITION",
        category: "LOGIC",
        label: "Qualidade OK?",
        config: { condition: "inspect.result === 'pass'" },
        nextStepId: "ws5",
      },
      {
        id: "ws5",
        workflowId: "wf1",
        actionType: "FINISH",
        category: "ACTION",
        label: "Finalizar com Molho",
        config: { process: "Empratar" },
        nextStepId: null,
      },
    ],
  },
  {
    id: "wf2",
    name: "Preparo de Picanha na Brasa",
    description: "Fluxo de churrasco na brasa",
    version: "1.2",
    status: "ACTIVE",
    createdAt: "2026-06-10",
    updatedAt: "2026-07-18",
    steps: [
      {
        id: "ws5",
        workflowId: "wf2",
        actionType: "PREPARE",
        category: "ACTION",
        label: "Preparar Corte",
        config: { station: "Churrasqueira" },
        stationId: "st2",
        estimatedTime: 3,
        nextStepId: "ws6",
      },
      {
        id: "ws6",
        workflowId: "wf2",
        actionType: "ASSEMBLE",
        category: "ACTION",
        label: "Montar Prato",
        config: { components: "picanha, farofa, vinagrete" },
        nextStepId: "ws7",
      },
      {
        id: "ws7",
        workflowId: "wf2",
        actionType: "PACK",
        category: "ACTION",
        label: "Embalar Delivery",
        config: { packType: "Marmita" },
        nextStepId: null,
      },
    ],
  },
  {
    id: "wf3",
    name: "Auditoria Semanal de Higiene",
    description: "Workflow de auditoria semanal de boas práticas",
    version: "0.5",
    status: "DRAFT",
    createdAt: "2026-07-01",
    updatedAt: "2026-07-10",
    steps: [
      {
        id: "ws8",
        workflowId: "wf3",
        actionType: "SCHEDULE",
        category: "TRANSFORM",
        label: "Agendar Auditoria",
        config: { cron: "0 8 * * 1" },
        nextStepId: "ws9",
      },
      {
        id: "ws9",
        workflowId: "wf3",
        actionType: "APPLY_STANDARD",
        category: "SYSTEM",
        label: "Aplicar RDC 216",
        config: { standardId: "ANVISA RDC 216" },
        nextStepId: "ws10",
      },
      {
        id: "ws10",
        workflowId: "wf3",
        actionType: "INSPECT",
        category: "FACILITIES",
        label: "Inspecionar",
        config: { criteria: "Todos os requisitos" },
        nextStepId: "ws11",
      },
      {
        id: "ws11",
        workflowId: "wf3",
        actionType: "CONDITION",
        category: "LOGIC",
        label: "Passou?",
        config: { condition: "inspect.score >= 80" },
        nextStepId: null,
      },
    ],
  },
];
