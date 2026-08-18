from sqlmodel import select, func
from sqlmodel.ext.asyncio.session import AsyncSession
from datetime import datetime, timedelta

from langflow.services.database.models.operations import Order, OrderItem, Product, Customer, Inventory


class DashboardService:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_stats(self, tenant_id: str) -> dict:
        today = datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)
        month_start = today.replace(day=1)

        total_orders = await self.session.exec(
            select(func.count(Order.id)).where(Order.tenant_id == tenant_id)
        )
        total_orders = total_orders.one()

        month_orders = await self.session.exec(
            select(func.count(Order.id)).where(
                Order.tenant_id == tenant_id,
                Order.created_at >= month_start,
            )
        )
        month_orders = month_orders.one()

        today_orders = await self.session.exec(
            select(func.count(Order.id)).where(
                Order.tenant_id == tenant_id,
                Order.created_at >= today,
            )
        )
        today_orders = today_orders.one()

        total_revenue = await self.session.exec(
            select(func.sum(Order.total)).where(Order.tenant_id == tenant_id)
        )
        total_revenue = float(total_revenue.one() or 0)

        month_revenue = await self.session.exec(
            select(func.sum(Order.total)).where(
                Order.tenant_id == tenant_id,
                Order.created_at >= month_start,
            )
        )
        month_revenue = float(month_revenue.one() or 0)

        customer_count = await self.session.exec(
            select(func.count(Customer.id)).where(Customer.tenant_id == tenant_id)
        )
        customer_count = customer_count.one()

        critical_stock = await self.session.exec(
            select(func.count(Inventory.id)).where(
                Inventory.quantity_available < Inventory.min_threshold,
            )
        )
        critical_stock = critical_stock.one()

        return {
            "dailyProduction": {"value": today_orders, "change": 0},
            "monthlySales": {"value": month_revenue, "change": 0},
            "newCustomers": {"value": customer_count, "change": 0},
            "stockAlerts": {"value": critical_stock, "change": 0},
        }

    async def get_activities(self, tenant_id: str) -> list[dict]:
        orders = await self.session.exec(
            select(Order)
            .where(Order.tenant_id == tenant_id)
            .order_by(Order.created_at.desc())
            .limit(10)
        )
        return [
            {
                "id": o.id,
                "description": f"Pedido #{o.id[:8]} - {o.status}",
                "timestamp": o.created_at.isoformat(),
                "type": "order",
            }
            for o in orders.all()
        ]

    async def get_production_chart(self, tenant_id: str) -> dict:
        today = datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)
        labels = []
        values = []
        for i in range(6, -1, -1):
            day = today - timedelta(days=i)
            count = await self.session.exec(
                select(func.count(Order.id)).where(
                    Order.tenant_id == tenant_id,
                    func.date(Order.created_at) == day.date(),
                )
            )
            labels.append(day.strftime("%a"))
            values.append(count.one())
        return {"labels": labels, "values": values}
