from sqlmodel import SQLModel, Field, Column, DECIMAL
import uuid as _uuid
import decimal
from datetime import datetime

from .enums import OrderStatus


class Order(SQLModel, table=True):
    __tablename__ = "order"

    id: str = Field(default_factory=lambda: str(_uuid.uuid4()), primary_key=True)
    customer_id: str = Field(foreign_key="customer.id", index=True)
    status: str = Field(default=OrderStatus.PENDING)
    total: decimal.Decimal = Field(sa_column=Column(DECIMAL(10, 2)))
    tenant_id: str = Field(foreign_key="tenant.id", index=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(
        default_factory=datetime.utcnow,
        sa_column_kwargs={"onupdate": datetime.utcnow},
    )
