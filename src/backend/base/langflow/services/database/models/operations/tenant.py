from sqlmodel import SQLModel, Field, Column, JSON
from datetime import datetime
import uuid as _uuid

from .enums import SectorEnum


class Tenant(SQLModel, table=True):
    __tablename__ = "tenant"

    id: str = Field(default_factory=lambda: str(_uuid.uuid4()), primary_key=True)
    name: str
    sector: str = Field(default=SectorEnum.MANUFACTURING)
    config: dict = Field(default={}, sa_column=Column(JSON))
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(
        default_factory=datetime.utcnow,
        sa_column_kwargs={"onupdate": datetime.utcnow},
    )
