export interface DashboardStats {
  dailyProduction: { value: number; change: number };
  monthlySales: { value: number; change: number };
  newCustomers: { value: number; change: number };
  stockAlerts: { value: number; change: number };
}

export interface ActivityEntry {
  id: string;
  description: string;
  timestamp: string;
  type: "order" | "alert" | "production" | "compliance";
}

export const MOCK_DASHBOARD_STATS: DashboardStats = {
  dailyProduction: { value: 87, change: 12 },
  monthlySales: { value: 38750, change: 8.5 },
  newCustomers: { value: 23, change: -3 },
  stockAlerts: { value: 2, change: -50 },
};

export const MOCK_ACTIVITIES: ActivityEntry[] = [
  {
    id: "act1",
    description: "Comanda #87 finalizada e enviada à mesa 12",
    timestamp: "2026-07-19T10:30:00",
    type: "order",
  },
  {
    id: "act2",
    description: "Estoque crítico: Tomate Italiano",
    timestamp: "2026-07-19T10:15:00",
    type: "alert",
  },
  {
    id: "act3",
    description: "Comanda #84 avançou para a Churrasqueira",
    timestamp: "2026-07-19T10:00:00",
    type: "production",
  },
  {
    id: "act4",
    description: "Auditoria ANVISA RDC 216: 92% conformidade",
    timestamp: "2026-07-19T09:45:00",
    type: "compliance",
  },
  {
    id: "act5",
    description: "Comanda #86 registrada no balcão",
    timestamp: "2026-07-19T09:30:00",
    type: "order",
  },
  {
    id: "act6",
    description: "Higienização da chapa/grelha concluída",
    timestamp: "2026-07-19T09:00:00",
    type: "production",
  },
];

export const MOCK_PRODUCTION_CHART = {
  labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
  values: [62, 58, 65, 70, 88, 95, 87],
};
