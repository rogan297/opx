from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from langflow.api.utils import CurrentActiveUser, DbSession
from langflow.api.utils.tenant import CurrentTenant
from langflow.services.operations import AssetService


class AssetCreate(BaseModel):
    name: str
    health_pct: float = 100.0
    last_service: str = ""
    next_service: str = ""
    category: str = ""
    uptime_pct: float = 100.0
    hours_operated: float = 0.0
    energy_consumption: float = 0.0
    critical_count: int = 0


class AssetUpdate(BaseModel):
    name: str | None = None
    health_pct: float | None = None
    last_service: str | None = None
    next_service: str | None = None
    category: str | None = None
    uptime_pct: float | None = None
    hours_operated: float | None = None
    energy_consumption: float | None = None
    critical_count: int | None = None


router = APIRouter(prefix="/operations/asset", tags=["operations-asset"])


@router.get("")
async def list_assets(
    session: DbSession,
    current_user: CurrentActiveUser,
    tenant_id: CurrentTenant,
):
    service = AssetService(session)
    return await service.list_by_tenant(tenant_id)


@router.post("")
async def create_asset(
    session: DbSession,
    current_user: CurrentActiveUser,
    tenant_id: CurrentTenant,
    body: AssetCreate,
):
    service = AssetService(session)
    return await service.create(tenant_id=tenant_id, **body.model_dump())


@router.get("/{asset_id}")
async def get_asset(
    session: DbSession,
    current_user: CurrentActiveUser,
    asset_id: str,
):
    service = AssetService(session)
    asset = await service.get(asset_id)
    if not asset:
        raise HTTPException(status_code=404, detail="Asset not found")
    return asset


@router.patch("/{asset_id}")
async def update_asset(
    session: DbSession,
    current_user: CurrentActiveUser,
    asset_id: str,
    body: AssetUpdate,
):
    service = AssetService(session)
    asset = await service.update(asset_id, **{k: v for k, v in body.model_dump().items() if v is not None})
    if not asset:
        raise HTTPException(status_code=404, detail="Asset not found")
    return asset


@router.delete("/{asset_id}")
async def delete_asset(
    session: DbSession,
    current_user: CurrentActiveUser,
    asset_id: str,
):
    service = AssetService(session)
    deleted = await service.delete(asset_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Asset not found")
    return {"ok": True}
