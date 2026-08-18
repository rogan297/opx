export interface Asset {
  id: string;
  name: string;
  healthPct: number;
  lastService: string;
  nextService: string;
  category: string;
  uptimePct: number;
  hoursOperated: number;
  energyConsumption: number;
  criticalCount: number;
}

export const MOCK_ASSETS: Asset[] = [
  {
    id: "a1",
    name: "Câmara Frigorífica",
    healthPct: 92,
    lastService: "2026-07-01",
    nextService: "2026-08-01",
    category: "Refrigeração",
    uptimePct: 99.5,
    hoursOperated: 2840,
    energyConsumption: 850,
    criticalCount: 0,
  },
  {
    id: "a2",
    name: "Forno Convecção",
    healthPct: 78,
    lastService: "2026-06-15",
    nextService: "2026-07-28",
    category: "Cocção",
    uptimePct: 97.2,
    hoursOperated: 4200,
    energyConsumption: 1200,
    criticalCount: 2,
  },
  {
    id: "a3",
    name: "Grelha/Chapa Inox",
    healthPct: 65,
    lastService: "2026-05-20",
    nextService: "2026-07-25",
    category: "Cocção",
    uptimePct: 94.8,
    hoursOperated: 8760,
    energyConsumption: 900,
    criticalCount: 3,
  },
  {
    id: "a4",
    name: "Freezer Vertical",
    healthPct: 88,
    lastService: "2026-07-10",
    nextService: "2026-08-10",
    category: "Refrigeração",
    uptimePct: 98.9,
    hoursOperated: 1560,
    energyConsumption: 480,
    criticalCount: 0,
  },
  {
    id: "a5",
    name: "Exaustor Industrial",
    healthPct: 95,
    lastService: "2026-06-28",
    nextService: "2026-09-28",
    category: "Ventilação",
    uptimePct: 100,
    hoursOperated: 7200,
    energyConsumption: 600,
    criticalCount: 0,
  },
  {
    id: "a6",
    name: "Lavadora de Louças",
    healthPct: 45,
    lastService: "2026-04-10",
    nextService: "2026-07-20",
    category: "Higienização",
    uptimePct: 88.3,
    hoursOperated: 8760,
    energyConsumption: 350,
    criticalCount: 5,
  },
];
