from fastapi import HTTPException
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from langflow.services.database.models.operations import Tenant


class TenantService:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_config(self, tenant_id: str) -> dict:
        tenant = await self.session.get(Tenant, tenant_id)
        if not tenant:
            raise HTTPException(status_code=404, detail="Tenant not found")
        return {
            "id": tenant.id,
            "name": tenant.name,
            "sector": tenant.sector,
            "config": tenant.config,
        }

    async def list_all(self) -> list[Tenant]:
        result = await self.session.exec(select(Tenant))
        return result.all()

    async def get(self, tenant_id: str) -> Tenant | None:
        return await self.session.get(Tenant, tenant_id)

    async def create(self, name: str, sector: str | None = None, config: dict | None = None) -> Tenant:
        tenant = Tenant(name=name, sector=sector or "MANUFACTURING", config=config or {})
        self.session.add(tenant)
        await self.session.commit()
        await self.session.refresh(tenant)
        return tenant
