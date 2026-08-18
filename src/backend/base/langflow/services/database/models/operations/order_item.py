from sqlmodel import SQLModel, Field
import uuid as _uuid
from datetime import datetime

from .enums import OrderStatus


class OrderItem(SQLModel, table=True):
    __tablename__ = "order_item"

    id: str = Field(default_factory=lambda: str(_uuid.uuid4()), primary_key=True)
    order_id: str = Field(foreign_key="order.id", index=True)
    product_id: str = Field(foreign_key="product.id", index=True)
    quantity: int
    preparation_status: str = Field(default=OrderStatus.PENDING)
    started_at: datetime | None = None
    finished_at: datetime | None = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(
        default_factory=datetime.utcnow,
        sa_column_kwargs={"onupdate": datetime.utcnow},
    )
