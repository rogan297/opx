export interface StockItem {
  id: string;
  productId: string;
  productName: string;
  quantityAvailable: number;
  minThreshold: number;
  unit: string;
  status: "critical" | "alert" | "stable";
  lastUpdated: string;
}

export interface StockMovement {
  id: string;
  inventoryId: string;
  type: "INPUT" | "OUTPUT" | "PRODUCTION_INPUT" | "PRODUCTION_OUTPUT";
  reason: string;
  quantity: number;
  createdAt: string;
  notes?: string;
}

export const MOCK_STOCK: StockItem[] = [
  {
    id: "inv1",
    productId: "p3",
    productName: "Tomate Italiano",
    quantityAvailable: 3,
    minThreshold: 10,
    unit: "kg",
    status: "critical",
    lastUpdated: "2026-07-18",
  },
  {
    id: "inv2",
    productId: "p4",
    productName: "Arroz Arbóreo",
    quantityAvailable: 12,
    minThreshold: 8,
    unit: "kg",
    status: "stable",
    lastUpdated: "2026-07-19",
  },
  {
    id: "inv3",
    productId: "p7",
    productName: "Queijo Parmesão",
    quantityAvailable: 15,
    minThreshold: 10,
    unit: "kg",
    status: "stable",
    lastUpdated: "2026-07-17",
  },
  {
    id: "inv4",
    productId: "p1",
    productName: "Filé Mignon ao Molho Madeira",
    quantityAvailable: 45,
    minThreshold: 20,
    unit: "un",
    status: "stable",
    lastUpdated: "2026-07-19",
  },
  {
    id: "inv5",
    productId: "p5",
    productName: "Manteiga com Sal",
    quantityAvailable: 18,
    minThreshold: 15,
    unit: "kg",
    status: "alert",
    lastUpdated: "2026-07-19",
  },
  {
    id: "inv6",
    productId: "p8",
    productName: "Azeite Extra Virgem",
    quantityAvailable: 8,
    minThreshold: 10,
    unit: "L",
    status: "critical",
    lastUpdated: "2026-07-18",
  },
  {
    id: "inv7",
    productId: "p11",
    productName: "Filé Mignon Bovino",
    quantityAvailable: 22,
    minThreshold: 15,
    unit: "kg",
    status: "stable",
    lastUpdated: "2026-07-19",
  },
];

export const MOCK_STOCK_MOVEMENTS: Record<string, StockMovement[]> = {
  inv1: [
    {
      id: "sm1",
      inventoryId: "inv1",
      type: "INPUT",
      reason: "PURCHASE",
      quantity: 10,
      createdAt: "2026-07-10",
      notes: "Compra semanal no CEASA",
    },
    {
      id: "sm2",
      inventoryId: "inv1",
      type: "OUTPUT",
      reason: "PRODUCTION_FINISH",
      quantity: 5,
      createdAt: "2026-07-12",
    },
    {
      id: "sm3",
      inventoryId: "inv1",
      type: "OUTPUT",
      reason: "WASTE",
      quantity: 2,
      createdAt: "2026-07-14",
      notes: "Merma de preparo",
    },
  ],
  inv2: [
    {
      id: "sm4",
      inventoryId: "inv2",
      type: "INPUT",
      reason: "PURCHASE",
      quantity: 20,
      createdAt: "2026-07-15",
    },
    {
      id: "sm5",
      inventoryId: "inv2",
      type: "OUTPUT",
      reason: "PRODUCTION_FINISH",
      quantity: 5,
      createdAt: "2026-07-18",
    },
  ],
};
