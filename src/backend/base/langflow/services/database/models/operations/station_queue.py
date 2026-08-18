from sqlmodel import SQLModel, Field
import uuid as _uuid
from datetime import datetime


class StationQueue(SQLModel, table=True):
    __tablename__ = "station_queue"

    id: str = Field(default_factory=lambda: str(_uuid.uuid4()), primary_key=True)
    station_id: str = Field(foreign_key="station.id", index=True)
    production_order_id: str = Field(foreign_key="production_order.id", index=True)
    entered_at: datetime = Field(default_factory=datetime.utcnow)
    exited_at: datetime | None = None
