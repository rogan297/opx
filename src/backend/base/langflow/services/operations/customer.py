from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from langflow.services.database.models.operations import Customer


class CustomerService:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def list_by_tenant(self, tenant_id: str) -> list[Customer]:
        stmt = select(Customer).where(Customer.tenant_id == tenant_id)
        result = await self.session.exec(stmt)
        return result.all()

    async def get(self, customer_id: str) -> Customer | None:
        return await self.session.get(Customer, customer_id)

    async def create(self, tenant_id: str, name: str, email: str | None = None) -> Customer:
        customer = Customer(name=name, tenant_id=tenant_id, email=email)
        self.session.add(customer)
        await self.session.commit()
        await self.session.refresh(customer)
        return customer
