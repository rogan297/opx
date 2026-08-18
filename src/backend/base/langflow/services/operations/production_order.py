from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from datetime import datetime

from langflow.services.database.models.operations import Order, OrderItem, ProductionOrder, Workflow


class ProductionOrderService:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def list_by_tenant(self, tenant_id: str) -> list[ProductionOrder]:
        stmt = select(ProductionOrder).where(ProductionOrder.tenant_id == tenant_id)
        result = await self.session.exec(stmt)
        return result.all()

    async def get(self, order_id: str) -> ProductionOrder | None:
        return await self.session.get(ProductionOrder, order_id)

    async def create(self, order_item_id: str, workflow_id: str) -> ProductionOrder | None:
        workflow = await self.session.get(Workflow, workflow_id)
        if not workflow:
            return None

        order_item = await self.session.get(OrderItem, order_item_id)
        if not order_item:
            return None

        order = await self.session.get(Order, order_item.order_id)
        if not order:
            return None

        po = ProductionOrder(
            order_item_id=order_item_id,
            tenant_id=order.tenant_id,
            status="PENDING",
        )
        self.session.add(po)
        await self.session.commit()
        await self.session.refresh(po)
        return po

    async def complete(self, po_id: str) -> ProductionOrder | None:
        po = await self.session.get(ProductionOrder, po_id)
        if not po:
            return None
        po.status = "COMPLETED"
        po.finished_at = datetime.utcnow()
        self.session.add(po)
        await self.session.commit()
        await self.session.refresh(po)
        return po
