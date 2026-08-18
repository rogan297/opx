from sqlmodel import SQLModel, Field, Column, JSON
import uuid as _uuid
from datetime import datetime


class Standard(SQLModel, table=True):
    __tablename__ = "standard"

    id: str = Field(default_factory=lambda: str(_uuid.uuid4()), primary_key=True)
    name: str
    type: str
    version: str | None = None
    description: str | None = None
    tenant_id: str | None = Field(default=None, foreign_key="tenant.id", index=True)
    sections: dict = Field(default={}, sa_column=Column(JSON))
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(
        default_factory=datetime.utcnow,
        sa_column_kwargs={"onupdate": datetime.utcnow},
    )
