export interface Standard {
  id: string;
  name: string;
  description: string;
  category: string;
  type: string;
  isActive: boolean;
  complianceScore: number;
  requirements: number;
  passed: number;
}

export interface ComplianceTask {
  id: string;
  standardId: string;
  title: string;
  status: "pending" | "in_progress" | "completed" | "failed";
  dueDate: string;
  assignee: string;
}

export const MOCK_STANDARDS: Standard[] = [
  {
    id: "std1",
    name: "ANVISA RDC 216",
    description: "Boas Práticas na Manipulação de Alimentos",
    category: "Qualidade",
    type: "ANVISA",
    isActive: true,
    complianceScore: 87,
    requirements: 42,
    passed: 36,
  },
  {
    id: "std2",
    name: "APPCC",
    description: "Análise de Perigos e Pontos Críticos de Controle",
    category: "Segurança Alimentar",
    type: "APPCC",
    isActive: true,
    complianceScore: 72,
    requirements: 28,
    passed: 20,
  },
  {
    id: "std3",
    name: "ISO 22000",
    description: "Sistema de Gestão de Segurança de Alimentos",
    category: "Segurança Alimentar",
    type: "ISO",
    isActive: true,
    complianceScore: 91,
    requirements: 35,
    passed: 32,
  },
  {
    id: "std4",
    name: "Vigilância Sanitária",
    description: "Licenciamento e inspeção municipal",
    category: "Licenças",
    type: "Municipal",
    isActive: true,
    complianceScore: 65,
    requirements: 18,
    passed: 12,
  },
  {
    id: "std5",
    name: "Alvará de Funcionamento",
    description: "Licença de funcionamento do estabelecimento",
    category: "Licenças",
    type: "Municipal",
    isActive: true,
    complianceScore: 100,
    requirements: 15,
    passed: 15,
  },
  {
    id: "std6",
    name: "ISO 27001",
    description: "Segurança da Informação",
    category: "TI",
    type: "ISO",
    isActive: false,
    complianceScore: 45,
    requirements: 38,
    passed: 17,
  },
  {
    id: "std7",
    name: "Rastreabilidade de Insumos",
    description: "Controle de origem e validade dos insumos",
    category: "Segurança Alimentar",
    type: "Interna",
    isActive: true,
    complianceScore: 58,
    requirements: 22,
    passed: 13,
  },
  {
    id: "std8",
    name: "Certificação Orgânica",
    description: "Certificação para pratos com insumos orgânicos",
    category: "Sustentabilidade",
    type: "Certificação",
    isActive: true,
    complianceScore: 0,
    requirements: 50,
    passed: 0,
  },
];

export const MOCK_COMPLIANCE_TASKS: ComplianceTask[] = [
  {
    id: "ct1",
    standardId: "std1",
    title: "Revisão dos procedimentos de manipulação",
    status: "in_progress",
    dueDate: "2026-08-01",
    assignee: "Lucia Pereira",
  },
  {
    id: "ct2",
    standardId: "std2",
    title: "Auditoria de pontos críticos de temperatura",
    status: "pending",
    dueDate: "2026-08-15",
    assignee: "Carlos Silva",
  },
  {
    id: "ct3",
    standardId: "std3",
    title: "Treinamento de segurança alimentar",
    status: "completed",
    dueDate: "2026-07-10",
    assignee: "Ana Oliveira",
  },
  {
    id: "ct4",
    standardId: "std4",
    title: "Renovação do licenciamento sanitário",
    status: "failed",
    dueDate: "2026-07-05",
    assignee: "Pedro Alves",
  },
  {
    id: "ct5",
    standardId: "std7",
    title: "Relatório de validade dos insumos",
    status: "pending",
    dueDate: "2026-08-30",
    assignee: "Maria Costa",
  },
];
