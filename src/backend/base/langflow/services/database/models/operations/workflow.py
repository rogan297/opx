from sqlmodel import SQLModel, Field, Column, JSON
import uuid as _uuid
from datetime import datetime

from .enums import WorkflowStatus


class Workflow(SQLModel, table=True):
    __tablename__ = "workflow"

    id: str = Field(default_factory=lambda: str(_uuid.uuid4()), primary_key=True)
    name: str
    description: str | None = None
    is_active: bool = Field(default=True)
    status: str = Field(default=WorkflowStatus.DRAFT)
    tenant_id: str = Field(foreign_key="tenant.id", index=True)
    dsl: dict = Field(default={}, sa_column=Column(JSON))
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(
        default_factory=datetime.utcnow,
        sa_column_kwargs={"onupdate": datetime.utcnow},
    )
