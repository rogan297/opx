from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from langflow.services.database.models.operations import StockMovement


class StockMovementService:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def list_by_inventory(self, inventory_id: str) -> list[StockMovement]:
        stmt = select(StockMovement).where(StockMovement.inventory_id == inventory_id).order_by(StockMovement.created_at.desc())
        result = await self.session.exec(stmt)
        return result.all()

    async def create(self, inventory_id: str, user_id: str, quantity: int, type: str, reason: str | None = None, order_id: str | None = None) -> StockMovement:
        movement = StockMovement(
            inventory_id=inventory_id, user_id=user_id,
            quantity=quantity, type=type, reason=reason, order_id=order_id,
        )
        self.session.add(movement)
        await self.session.commit()
        await self.session.refresh(movement)
        return movement
