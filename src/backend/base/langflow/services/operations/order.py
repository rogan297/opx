from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
import decimal
from datetime import datetime

from langflow.services.database.models.operations import Order, OrderItem


class OrderService:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def list_by_tenant(self, tenant_id: str) -> list[Order]:
        stmt = select(Order).where(Order.tenant_id == tenant_id)
        result = await self.session.exec(stmt)
        return result.all()

    async def get(self, order_id: str) -> Order | None:
        return await self.session.get(Order, order_id)

    async def create(
        self,
        customer_id: str,
        tenant_id: str,
        total: decimal.Decimal,
        items: list[dict],
    ) -> Order:
        order = Order(
            customer_id=customer_id,
            tenant_id=tenant_id,
            total=total,
        )
        self.session.add(order)
        await self.session.flush()

        for item in items:
            order_item = OrderItem(
                order_id=order.id,
                product_id=item["product_id"],
                quantity=item["quantity"],
            )
            self.session.add(order_item)

        await self.session.commit()
        await self.session.refresh(order)
        return order

    async def update_status(self, order_id: str, status: str) -> Order | None:
        order = await self.session.get(Order, order_id)
        if not order:
            return None
        order.status = status
        order.updated_at = datetime.utcnow()
        self.session.add(order)
        await self.session.commit()
        await self.session.refresh(order)
        return order
