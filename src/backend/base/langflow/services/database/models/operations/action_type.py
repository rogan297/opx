from sqlmodel import SQLModel, Field
import uuid as _uuid

from .enums import StepCategory


class ActionType(SQLModel, table=True):
    __tablename__ = "action_type"

    id: str = Field(default_factory=lambda: str(_uuid.uuid4()), primary_key=True)
    name: str
    category: str = Field(default=StepCategory.ACTION)
    icon: str | None = None
    is_system: bool = Field(default=False)
    tenant_id: str | None = Field(default=None, foreign_key="tenant.id", index=True)
