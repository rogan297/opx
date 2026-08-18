from langflow.api.v1.operations.tenant import router as tenant_router
from langflow.api.v1.operations.action_type import router as action_type_router
from langflow.api.v1.operations.product import router as product_router
from langflow.api.v1.operations.inventory import router as inventory_router
from langflow.api.v1.operations.stock_movement import router as stock_movement_router
from langflow.api.v1.operations.customer import router as customer_router
from langflow.api.v1.operations.order import router as order_router
from langflow.api.v1.operations.station import router as station_router
from langflow.api.v1.operations.station_queue import router as station_queue_router
from langflow.api.v1.operations.workflow import router as workflow_router
from langflow.api.v1.operations.workflow_step import router as workflow_step_router
from langflow.api.v1.operations.production_order import router as production_order_router
from langflow.api.v1.operations.dashboard import router as dashboard_router
from langflow.api.v1.operations.employee import router as employee_router
from langflow.api.v1.operations.asset import router as asset_router
from langflow.api.v1.operations.standard import router as standard_router

__all__ = [
    "tenant_router",
    "action_type_router",
    "product_router",
    "inventory_router",
    "stock_movement_router",
    "customer_router",
    "order_router",
    "station_router",
    "station_queue_router",
    "workflow_router",
    "workflow_step_router",
    "production_order_router",
    "dashboard_router",
    "employee_router",
    "asset_router",
    "standard_router",
]
