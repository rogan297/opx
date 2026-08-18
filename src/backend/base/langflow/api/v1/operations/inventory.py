from fastapi import APIRouter, HTTPException

from langflow.api.utils import CurrentActiveUser, DbSession
from langflow.services.operations import InventoryService

router = APIRouter(prefix="/operations/inventory", tags=["operations-inventory"])


@router.get("")
async def list_inventory(
    session: DbSession,
    current_user: CurrentActiveUser,
):
    service = InventoryService(session)
    return await service.list_all()


@router.get("/by-product/{product_id}")
async def get_inventory_by_product(
    session: DbSession,
    current_user: CurrentActiveUser,
    product_id: str,
):
    service = InventoryService(session)
    inv = await service.get_by_product(product_id)
    if not inv:
        raise HTTPException(status_code=404, detail="Inventory not found for product")
    return inv


@router.get("/{inventory_id}")
async def get_inventory(
    session: DbSession,
    current_user: CurrentActiveUser,
    inventory_id: str,
):
    service = InventoryService(session)
    inv = await service.get(inventory_id)
    if not inv:
        raise HTTPException(status_code=404, detail="Inventory not found")
    return inv


@router.patch("/{inventory_id}/adjust")
async def adjust_inventory(
    session: DbSession,
    current_user: CurrentActiveUser,
    inventory_id: str,
    delta: int,
):
    service = InventoryService(session)
    inv = await service.adjust_quantity(inventory_id, delta)
    if not inv:
        raise HTTPException(status_code=404, detail="Inventory not found")
    return inv
