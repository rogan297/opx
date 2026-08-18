from sqlmodel import SQLModel, Field
import uuid as _uuid
from datetime import datetime


class Customer(SQLModel, table=True):
    __tablename__ = "customer"

    id: str = Field(default_factory=lambda: str(_uuid.uuid4()), primary_key=True)
    name: str
    email: str | None = Field(default=None, unique=True)
    password: str | None = None
    tenant_id: str = Field(foreign_key="tenant.id", index=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(
        default_factory=datetime.utcnow,
        sa_column_kwargs={"onupdate": datetime.utcnow},
    )
