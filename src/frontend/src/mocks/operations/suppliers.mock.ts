export interface Supplier {
  id: string;
  name: string;
  rating: number;
  reliabilityPct: number;
  lastOrder: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  onTimeDelivery: number;
  savingsViaAI: number;
  qualitySLA: number;
}

export const MOCK_SUPPLIERS: Supplier[] = [
  {
    id: "s1",
    name: "CEASA Hortifrúti",
    rating: 4.8,
    reliabilityPct: 97,
    lastOrder: "2026-07-15",
    contactName: "Carlos Silva",
    contactPhone: "(11) 99999-0001",
    contactEmail: "carlos@ceasahortifruti.com",
    onTimeDelivery: 98,
    savingsViaAI: 12,
    qualitySLA: 99,
  },
  {
    id: "s2",
    name: "Distribuidora Carnes Premium",
    rating: 4.5,
    reliabilityPct: 92,
    lastOrder: "2026-07-16",
    contactName: "Maria Oliveira",
    contactPhone: "(11) 99999-0002",
    contactEmail: "maria@carnespremium.com",
    onTimeDelivery: 90,
    savingsViaAI: 8,
    qualitySLA: 95,
  },
  {
    id: "s3",
    name: "Pescados Costa Azul",
    rating: 4.2,
    reliabilityPct: 88,
    lastOrder: "2026-07-10",
    contactName: "João Santos",
    contactPhone: "(11) 99999-0003",
    contactEmail: "joao@pescadoscostazul.com",
    onTimeDelivery: 85,
    savingsViaAI: 5,
    qualitySLA: 90,
  },
  {
    id: "s4",
    name: "Empório dos Grãos",
    rating: 4.9,
    reliabilityPct: 99,
    lastOrder: "2026-07-18",
    contactName: "Ana Costa",
    contactPhone: "(11) 99999-0004",
    contactEmail: "ana@emporiodosgraos.com",
    onTimeDelivery: 100,
    savingsViaAI: 15,
    qualitySLA: 100,
  },
  {
    id: "s5",
    name: "Laticínio Serra Doce",
    rating: 3.8,
    reliabilityPct: 78,
    lastOrder: "2026-07-05",
    contactName: "Pedro Alves",
    contactPhone: "(11) 99999-0005",
    contactEmail: "pedro@serradoce.com",
    onTimeDelivery: 75,
    savingsViaAI: 3,
    qualitySLA: 80,
  },
];
