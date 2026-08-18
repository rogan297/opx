from sqlmodel import SQLModel, Field
import uuid as _uuid
from datetime import datetime

from .enums import MovementType


class StockMovement(SQLModel, table=True):
    __tablename__ = "stock_movement"

    id: str = Field(default_factory=lambda: str(_uuid.uuid4()), primary_key=True)
    inventory_id: str = Field(foreign_key="inventory.id", index=True)
    user_id: str
    order_id: str | None = Field(default=None, foreign_key="order.id")
    quantity: int
    type: str = Field(default=MovementType.INPUT)
    reason: str | None = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
