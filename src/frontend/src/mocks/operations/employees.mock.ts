export interface Employee {
  id: string;
  name: string;
  role: string;
  station: string;
  isActive: boolean;
  email: string;
  phone: string;
  startDate: string;
}

export const MOCK_EMPLOYEES: Employee[] = [
  {
    id: "e1",
    name: "Carlos Silva",
    role: "Chef Executivo",
    station: "Cozinha",
    isActive: true,
    email: "carlos@restaurante.com",
    phone: "(11) 99999-1001",
    startDate: "2025-03-01",
  },
  {
    id: "e2",
    name: "Ana Oliveira",
    role: "Sous Chef",
    station: "Cozinha",
    isActive: true,
    email: "ana@restaurante.com",
    phone: "(11) 99999-1002",
    startDate: "2025-01-15",
  },
  {
    id: "e3",
    name: "João Santos",
    role: "Churrasqueiro",
    station: "Churrasqueira",
    isActive: true,
    email: "joao@restaurante.com",
    phone: "(11) 99999-1003",
    startDate: "2024-11-01",
  },
  {
    id: "e4",
    name: "Maria Costa",
    role: "Confeiteira",
    station: "Sobremesas",
    isActive: true,
    email: "maria@restaurante.com",
    phone: "(11) 99999-1004",
    startDate: "2026-02-15",
  },
  {
    id: "e5",
    name: "Pedro Alves",
    role: "Garçom",
    station: "Salão",
    isActive: true,
    email: "pedro@restaurante.com",
    phone: "(11) 99999-1005",
    startDate: "2025-06-01",
  },
  {
    id: "e6",
    name: "Lucia Pereira",
    role: "Gerente Geral",
    station: "Administração",
    isActive: true,
    email: "lucia@restaurante.com",
    phone: "(11) 99999-1006",
    startDate: "2024-08-01",
  },
  {
    id: "e7",
    name: "Rafael Lima",
    role: "Auxiliar de Copa",
    station: "Higienização",
    isActive: false,
    email: "rafael@restaurante.com",
    phone: "(11) 99999-1007",
    startDate: "2025-09-01",
  },
];
