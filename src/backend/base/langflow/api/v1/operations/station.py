from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from langflow.api.utils import CurrentActiveUser, DbSession
from langflow.api.utils.tenant import CurrentTenant
from langflow.services.operations import StationService


class StationCreate(BaseModel):
    name: str
    description: str | None = None
    responsible: str | None = None


router = APIRouter(prefix="/operations/station", tags=["operations-station"])


@router.get("")
async def list_stations(
    session: DbSession,
    current_user: CurrentActiveUser,
    tenant_id: CurrentTenant,
):
    service = StationService(session)
    return await service.list_by_tenant(tenant_id)


@router.post("")
async def create_station(
    session: DbSession,
    current_user: CurrentActiveUser,
    tenant_id: CurrentTenant,
    body: StationCreate,
):
    service = StationService(session)
    return await service.create(
        tenant_id=tenant_id,
        name=body.name,
        description=body.description,
        responsible=body.responsible,
    )


@router.get("/{station_id}")
async def get_station(
    session: DbSession,
    current_user: CurrentActiveUser,
    station_id: str,
):
    service = StationService(session)
    station = await service.get(station_id)
    if not station:
        raise HTTPException(status_code=404, detail="Station not found")
    return station
