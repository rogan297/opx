from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from langflow.api.utils import CurrentActiveUser, DbSession
from langflow.services.operations import StationQueueService


class StationQueueEnter(BaseModel):
    station_id: str
    production_order_id: str


router = APIRouter(prefix="/operations/station-queue", tags=["operations-station-queue"])


@router.get("/station/{station_id}")
async def list_queue_by_station(
    session: DbSession,
    current_user: CurrentActiveUser,
    station_id: str,
):
    service = StationQueueService(session)
    return await service.list_by_station(station_id)


@router.post("/enter")
async def enter_station(
    session: DbSession,
    current_user: CurrentActiveUser,
    body: StationQueueEnter,
):
    service = StationQueueService(session)
    return await service.enter_station(
        station_id=body.station_id,
        production_order_id=body.production_order_id,
    )


@router.patch("/{queue_id}/exit")
async def exit_station(
    session: DbSession,
    current_user: CurrentActiveUser,
    queue_id: str,
):
    service = StationQueueService(session)
    queue_item = await service.exit_station(queue_id)
    if not queue_item:
        raise HTTPException(status_code=404, detail="Queue item not found")
    return queue_item
