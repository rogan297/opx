from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from langflow.api.utils import CurrentActiveUser, DbSession
from langflow.services.operations import StockMovementService


class StockMovementCreate(BaseModel):
    inventory_id: str
    quantity: int
    type: str
    reason: str | None = None
    order_id: str | None = None


router = APIRouter(prefix="/operations/stock-movement", tags=["operations-stock-movement"])


@router.get("/inventory/{inventory_id}")
async def list_by_inventory(
    session: DbSession,
    current_user: CurrentActiveUser,
    inventory_id: str,
):
    service = StockMovementService(session)
    return await service.list_by_inventory(inventory_id)


@router.post("")
async def create_stock_movement(
    session: DbSession,
    current_user: CurrentActiveUser,
    body: StockMovementCreate,
):
    service = StockMovementService(session)
    return await service.create(
        inventory_id=body.inventory_id,
        user_id=current_user.id,
        quantity=body.quantity,
        type=body.type,
        reason=body.reason,
        order_id=body.order_id,
    )
