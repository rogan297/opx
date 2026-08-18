export interface ProductionOrder {
  id: string;
  productName: string;
  customerName: string;
  status: "PENDING" | "IN_PROGRESS" | "READY" | "COMPLETED";
  currentStation: string;
  elapsedTime: string;
  createdAt: string;
}

export interface Station {
  id: string;
  name: string;
  description: string;
  responsible: string;
  isActive: boolean;
  currentLoad: number;
}

export const MOCK_PRODUCTION_ORDERS: ProductionOrder[] = [
  {
    id: "po1",
    productName: "Filé Mignon ao Molho Madeira",
    customerName: "Mesa 5",
    status: "PENDING",
    currentStation: "Espera",
    elapsedTime: "0 min",
    createdAt: "2026-07-19T10:00:00",
  },
  {
    id: "po2",
    productName: "Risoto de Camarão",
    customerName: "Mesa 3",
    status: "IN_PROGRESS",
    currentStation: "Cozinha",
    elapsedTime: "8 min",
    createdAt: "2026-07-19T09:52:00",
  },
  {
    id: "po3",
    productName: "Picanha na Brasa",
    customerName: "Mesa 1",
    status: "IN_PROGRESS",
    currentStation: "Churrasqueira",
    elapsedTime: "5 min",
    createdAt: "2026-07-19T09:55:00",
  },
  {
    id: "po4",
    productName: "Pizza Margherita",
    customerName: "Mesa 2",
    status: "READY",
    currentStation: "Montagem",
    elapsedTime: "3 min",
    createdAt: "2026-07-19T09:57:00",
  },
  {
    id: "po5",
    productName: "Salmão Grelhado",
    customerName: "Mesa 4",
    status: "PENDING",
    currentStation: "Espera",
    elapsedTime: "0 min",
    createdAt: "2026-07-19T10:05:00",
  },
  {
    id: "po6",
    productName: "Filé Mignon ao Molho Madeira",
    customerName: "Mesa 6",
    status: "IN_PROGRESS",
    currentStation: "Cozinha",
    elapsedTime: "2 min",
    createdAt: "2026-07-19T09:58:00",
  },
];

export const MOCK_STATIONS: Station[] = [
  {
    id: "st1",
    name: "Cozinha",
    description: "Preparo de pratos principais e molhos",
    responsible: "Carlos",
    isActive: true,
    currentLoad: 45,
  },
  {
    id: "st2",
    name: "Churrasqueira",
    description: "Carnes grelhadas na brasa",
    responsible: "João",
    isActive: true,
    currentLoad: 70,
  },
  {
    id: "st3",
    name: "Fritura",
    description: "Entradas, acompanhamentos e frituras",
    responsible: "Ana",
    isActive: true,
    currentLoad: 30,
  },
  {
    id: "st4",
    name: "Sobremesas",
    description: "Doces, sobremesas e cafés especiais",
    responsible: "Maria",
    isActive: true,
    currentLoad: 20,
  },
  {
    id: "st5",
    name: "Montagem",
    description: "Montagem do prato e finalização",
    responsible: "Pedro",
    isActive: true,
    currentLoad: 55,
  },
  {
    id: "st6",
    name: "Higienização",
    description: "Lavagem de utensílios e limpeza do salão",
    responsible: "",
    isActive: false,
    currentLoad: 0,
  },
];
