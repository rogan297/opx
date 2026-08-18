from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from langflow.services.database.models.operations import Station


class StationService:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def list_by_tenant(self, tenant_id: str) -> list[Station]:
        stmt = select(Station).where(Station.tenant_id == tenant_id)
        result = await self.session.exec(stmt)
        return result.all()

    async def get(self, station_id: str) -> Station | None:
        return await self.session.get(Station, station_id)

    async def create(self, tenant_id: str, name: str, description: str | None = None, responsible: str | None = None) -> Station:
        station = Station(name=name, tenant_id=tenant_id, description=description, responsible=responsible)
        self.session.add(station)
        await self.session.commit()
        await self.session.refresh(station)
        return station
