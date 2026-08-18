from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from langflow.services.database.models.operations import Inventory


class InventoryService:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def list_all(self) -> list[Inventory]:
        result = await self.session.exec(select(Inventory))
        return result.all()

    async def get_by_product(self, product_id: str) -> Inventory | None:
        stmt = select(Inventory).where(Inventory.product_id == product_id)
        result = await self.session.exec(stmt)
        return result.first()

    async def get(self, inventory_id: str) -> Inventory | None:
        return await self.session.get(Inventory, inventory_id)

    async def adjust_quantity(self, inventory_id: str, delta: int) -> Inventory | None:
        inventory = await self.session.get(Inventory, inventory_id)
        if not inventory:
            return None
        inventory.quantity_available += delta
        self.session.add(inventory)
        await self.session.commit()
        await self.session.refresh(inventory)
        return inventory
