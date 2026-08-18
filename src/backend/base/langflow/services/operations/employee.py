from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from langflow.services.database.models.operations import Employee


class EmployeeService:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def list_by_tenant(self, tenant_id: str) -> list[Employee]:
        stmt = select(Employee).where(Employee.tenant_id == tenant_id)
        result = await self.session.exec(stmt)
        return result.all()

    async def get(self, employee_id: str) -> Employee | None:
        return await self.session.get(Employee, employee_id)

    async def create(self, tenant_id: str, **kwargs) -> Employee:
        emp = Employee(tenant_id=tenant_id, **kwargs)
        self.session.add(emp)
        await self.session.commit()
        await self.session.refresh(emp)
        return emp

    async def update(self, employee_id: str, **kwargs) -> Employee | None:
        emp = await self.session.get(Employee, employee_id)
        if not emp:
            return None
        for k, v in kwargs.items():
            setattr(emp, k, v)
        self.session.add(emp)
        await self.session.commit()
        await self.session.refresh(emp)
        return emp

    async def delete(self, employee_id: str) -> bool:
        emp = await self.session.get(Employee, employee_id)
        if not emp:
            return False
        await self.session.delete(emp)
        await self.session.commit()
        return True
