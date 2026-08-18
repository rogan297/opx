from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from langflow.api.utils import CurrentActiveUser, DbSession
from langflow.api.utils.tenant import CurrentTenant
from langflow.services.operations import ProductionOrderService


class ProductionOrderCreate(BaseModel):
    order_item_id: str
    workflow_id: str


router = APIRouter(prefix="/operations/production-order", tags=["operations-production-order"])


@router.get("")
async def list_production_orders(
    session: DbSession,
    current_user: CurrentActiveUser,
    tenant_id: CurrentTenant,
):
    service = ProductionOrderService(session)
    return await service.list_by_tenant(tenant_id)


@router.post("")
async def create_production_order(
    session: DbSession,
    current_user: CurrentActiveUser,
    body: ProductionOrderCreate,
):
    service = ProductionOrderService(session)
    po = await service.create(order_item_id=body.order_item_id, workflow_id=body.workflow_id)
    if not po:
        raise HTTPException(status_code=404, detail="Order item or workflow not found")
    return po


@router.get("/{po_id}")
async def get_production_order(
    session: DbSession,
    current_user: CurrentActiveUser,
    po_id: str,
):
    service = ProductionOrderService(session)
    po = await service.get(po_id)
    if not po:
        raise HTTPException(status_code=404, detail="Production order not found")
    return po


@router.patch("/{po_id}/complete")
async def complete_production_order(
    session: DbSession,
    current_user: CurrentActiveUser,
    po_id: str,
):
    service = ProductionOrderService(session)
    po = await service.complete(po_id)
    if not po:
        raise HTTPException(status_code=404, detail="Production order not found")
    return po
