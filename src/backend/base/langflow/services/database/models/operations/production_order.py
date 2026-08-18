from sqlmodel import SQLModel, Field
import uuid as _uuid
from datetime import datetime

from .enums import ProductionStatus


class ProductionOrder(SQLModel, table=True):
    __tablename__ = "production_order"

    id: str = Field(default_factory=lambda: str(_uuid.uuid4()), primary_key=True)
    order_item_id: str = Field(foreign_key="order_item.id", unique=True, index=True)
    tenant_id: str = Field(foreign_key="tenant.id", index=True)
    status: str = Field(default=ProductionStatus.PENDING)
    started_at: datetime | None = None
    finished_at: datetime | None = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(
        default_factory=datetime.utcnow,
        sa_column_kwargs={"onupdate": datetime.utcnow},
    )
