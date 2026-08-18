from sqlmodel import SQLModel, Field
import uuid as _uuid
from datetime import datetime


class Asset(SQLModel, table=True):
    __tablename__ = "asset"

    id: str = Field(default_factory=lambda: str(_uuid.uuid4()), primary_key=True)
    name: str
    health_pct: float = 100.0
    last_service: str = ""
    next_service: str = ""
    category: str = ""
    uptime_pct: float = 100.0
    hours_operated: float = 0.0
    energy_consumption: float = 0.0
    critical_count: int = 0
    tenant_id: str = Field(foreign_key="tenant.id", index=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(
        default_factory=datetime.utcnow,
        sa_column_kwargs={"onupdate": datetime.utcnow},
    )
