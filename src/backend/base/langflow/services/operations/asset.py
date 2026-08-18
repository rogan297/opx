from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from langflow.services.database.models.operations import Asset


class AssetService:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def list_by_tenant(self, tenant_id: str) -> list[Asset]:
        stmt = select(Asset).where(Asset.tenant_id == tenant_id)
        result = await self.session.exec(stmt)
        return result.all()

    async def get(self, asset_id: str) -> Asset | None:
        return await self.session.get(Asset, asset_id)

    async def create(self, tenant_id: str, **kwargs) -> Asset:
        asset = Asset(tenant_id=tenant_id, **kwargs)
        self.session.add(asset)
        await self.session.commit()
        await self.session.refresh(asset)
        return asset

    async def update(self, asset_id: str, **kwargs) -> Asset | None:
        asset = await self.session.get(Asset, asset_id)
        if not asset:
            return None
        for k, v in kwargs.items():
            setattr(asset, k, v)
        self.session.add(asset)
        await self.session.commit()
        await self.session.refresh(asset)
        return asset

    async def delete(self, asset_id: str) -> bool:
        asset = await self.session.get(Asset, asset_id)
        if not asset:
            return False
        await self.session.delete(asset)
        await self.session.commit()
        return True
