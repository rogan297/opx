export interface TenantConfig {
  id: string;
  name: string;
  sector: string;
  config: {
    modules: string[];
    vocab: Record<string, string>;
  };
}

export interface OpsProduct {
  id: string;
  name: string;
  price: number;
  description?: string;
  type?: string;
  tenant_id: string;
}

export interface OpsInventory {
  id: string;
  product_id: string;
  quantity_available: number;
  min_threshold?: number;
  unit?: string;
}

export interface OpsStockMovement {
  id: string;
  inventory_id: string;
  user_id: string;
  quantity: number;
  type: string;
  reason?: string;
  created_at: string;
}

export interface OpsCustomer {
  id: string;
  name: string;
  email?: string;
  tenant_id: string;
}

export interface OpsStation {
  id: string;
  name: string;
  description?: string;
  responsible?: string;
  tenant_id: string;
}

export interface OpsWorkflow {
  id: string;
  name: string;
  description?: string;
  status: string;
  steps: OpsWorkflowStep[];
  created_at: string;
  updated_at: string;
}

export interface OpsWorkflowStep {
  id: string;
  workflow_id: string;
  action_type_id: string;
  category: string;
  config: Record<string, unknown>;
  created_at: string;
}

export interface OpsProductionOrder {
  id: string;
  order_item_id: string;
  tenant_id: string;
  status: string;
  current_step_index?: number;
  started_at?: string;
  finished_at?: string;
  created_at: string;
}

export interface OpsActionType {
  id: string;
  name: string;
  category: string;
  icon?: string;
  is_system: boolean;
  tenant_id?: string;
}
