import { create } from "zustand";
import { MOCK_PRODUCTS, type Product } from "@/mocks/operations/products.mock";
import { MOCK_STOCK, type StockItem, MOCK_STOCK_MOVEMENTS, type StockMovement } from "@/mocks/operations/stock.mock";
import { MOCK_SUPPLIERS, type Supplier } from "@/mocks/operations/suppliers.mock";
import { MOCK_PRODUCTION_ORDERS, type ProductionOrder, MOCK_STATIONS, type Station } from "@/mocks/operations/production.mock";
import { MOCK_EMPLOYEES, type Employee } from "@/mocks/operations/employees.mock";
import { MOCK_ASSETS, type Asset } from "@/mocks/operations/assets.mock";
import { MOCK_STANDARDS, type Standard, MOCK_COMPLIANCE_TASKS, type ComplianceTask } from "@/mocks/operations/standards.mock";
import { MOCK_DASHBOARD_STATS, type DashboardStats, MOCK_ACTIVITIES, type ActivityEntry, MOCK_PRODUCTION_CHART } from "@/mocks/operations/dashboard.mock";
import type { OpsProduct, OpsInventory, OpsStation, OpsWorkflow, OpsProductionOrder } from "@/types/operations";

interface OperationsStore {
  products: Product[];
  stock: StockItem[];
  stockMovements: Record<string, StockMovement[]>;
  suppliers: Supplier[];
  productionOrders: ProductionOrder[];
  stations: Station[];
  employees: Employee[];
  assets: Asset[];
  standards: Standard[];
  complianceTasks: ComplianceTask[];
  dashboardStats: DashboardStats;
  activities: ActivityEntry[];
  productionChart: { labels: string[]; values: number[] };

  setProducts: (products: Product[]) => void;
  setStock: (stock: StockItem[]) => void;
  setProductionOrders: (orders: ProductionOrder[]) => void;
  setStations: (stations: Station[]) => void;
  setWorkflows: (workflows: OpsWorkflow[]) => void;
}

export const useOperationsStore = create<OperationsStore>((set) => ({
  products: MOCK_PRODUCTS,
  stock: MOCK_STOCK,
  stockMovements: MOCK_STOCK_MOVEMENTS,
  suppliers: MOCK_SUPPLIERS,
  productionOrders: MOCK_PRODUCTION_ORDERS,
  stations: MOCK_STATIONS,
  employees: MOCK_EMPLOYEES,
  assets: MOCK_ASSETS,
  standards: MOCK_STANDARDS,
  complianceTasks: MOCK_COMPLIANCE_TASKS,
  dashboardStats: MOCK_DASHBOARD_STATS,
  activities: MOCK_ACTIVITIES,
  productionChart: MOCK_PRODUCTION_CHART,

  setProducts: (products) => set({ products }),
  setStock: (stock) => set({ stock }),
  setProductionOrders: (orders) => set({ productionOrders: orders }),
  setStations: (stations) => set({ stations }),
  setWorkflows: (workflows) => set({ /* workflows will be mapped in consuming component */ }),
}));
