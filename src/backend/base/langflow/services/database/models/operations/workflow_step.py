from sqlmodel import SQLModel, Field, Column, JSON
import uuid as _uuid
from datetime import datetime

from .enums import StepCategory


class WorkflowStep(SQLModel, table=True):
    __tablename__ = "workflow_step"

    id: str = Field(default_factory=lambda: str(_uuid.uuid4()), primary_key=True)
    workflow_id: str = Field(foreign_key="workflow.id", index=True)
    action_type_id: str = Field(foreign_key="action_type.id")
    category: str = Field(default=StepCategory.ACTION)
    estimated_time: int | None = None
    next_step_id: str | None = None
    config: dict = Field(default={}, sa_column=Column(JSON))
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(
        default_factory=datetime.utcnow,
        sa_column_kwargs={"onupdate": datetime.utcnow},
    )
