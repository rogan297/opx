from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import decimal

from langflow.api.utils import CurrentActiveUser, DbSession
from langflow.api.utils.tenant import CurrentTenant
from langflow.services.operations import OrderService


class OrderItemPayload(BaseModel):
    product_id: str
    quantity: int


class OrderCreate(BaseModel):
    customer_id: str
    total: decimal.Decimal
    items: list[OrderItemPayload]


class OrderStatusUpdate(BaseModel):
    status: str


router = APIRouter(prefix="/operations/order", tags=["operations-order"])


@router.get("")
async def list_orders(
    session: DbSession,
    current_user: CurrentActiveUser,
    tenant_id: CurrentTenant,
):
    service = OrderService(session)
    return await service.list_by_tenant(tenant_id)


@router.post("")
async def create_order(
    session: DbSession,
    current_user: CurrentActiveUser,
    tenant_id: CurrentTenant,
    body: OrderCreate,
):
    service = OrderService(session)
    return await service.create(
        customer_id=body.customer_id,
        tenant_id=tenant_id,
        total=body.total,
        items=[item.model_dump() for item in body.items],
    )


@router.patch("/{order_id}/status")
async def update_order_status(
    session: DbSession,
    current_user: CurrentActiveUser,
    order_id: str,
    body: OrderStatusUpdate,
):
    service = OrderService(session)
    order = await service.update_status(order_id, body.status)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order


@router.get("/{order_id}")
async def get_order(
    session: DbSession,
    current_user: CurrentActiveUser,
    order_id: str,
):
    service = OrderService(session)
    order = await service.get(order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order
