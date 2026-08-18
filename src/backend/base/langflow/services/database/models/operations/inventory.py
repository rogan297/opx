from sqlmodel import SQLModel, Field
import uuid as _uuid
from datetime import datetime


class Inventory(SQLModel, table=True):
    __tablename__ = "inventory"

    id: str = Field(default_factory=lambda: str(_uuid.uuid4()), primary_key=True)
    product_id: str = Field(foreign_key="product.id", unique=True, index=True)
    quantity_available: int = Field(default=0)
    min_threshold: int = Field(default=5)
    last_updated: datetime = Field(default_factory=datetime.utcnow)
    created_at: datetime = Field(default_factory=datetime.utcnow)
