from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from datetime import datetime

from langflow.services.database.models.operations import StationQueue


class StationQueueService:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def list_by_station(self, station_id: str) -> list[StationQueue]:
        stmt = select(StationQueue).where(
            StationQueue.station_id == station_id,
            StationQueue.exited_at.is_(None),
        ).order_by(StationQueue.entered_at)
        result = await self.session.exec(stmt)
        return result.all()

    async def enter_station(self, station_id: str, production_order_id: str) -> StationQueue:
        queue_item = StationQueue(station_id=station_id, production_order_id=production_order_id)
        self.session.add(queue_item)
        await self.session.commit()
        await self.session.refresh(queue_item)
        return queue_item

    async def exit_station(self, queue_id: str) -> StationQueue | None:
        queue_item = await self.session.get(StationQueue, queue_id)
        if not queue_item:
            return None
        queue_item.exited_at = datetime.utcnow()
        self.session.add(queue_item)
        await self.session.commit()
        await self.session.refresh(queue_item)
        return queue_item
