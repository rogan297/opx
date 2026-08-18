from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from langflow.services.database.models.operations import Standard


class StandardService:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def list_by_tenant(self, tenant_id: str) -> list[dict]:
        stmt = select(Standard).where(Standard.tenant_id == tenant_id)
        result = await self.session.exec(stmt)
        return [_standard_to_dict(s) for s in result.all()]

    async def get(self, standard_id: str) -> dict | None:
        s = await self.session.get(Standard, standard_id)
        return _standard_to_dict(s) if s else None

    async def create(self, tenant_id: str, **kwargs) -> dict:
        sections = {
            "category": kwargs.pop("category", ""),
            "compliance_score": kwargs.pop("compliance_score", 0),
            "requirements": kwargs.pop("requirements", 0),
            "passed": kwargs.pop("passed", 0),
            "is_active": kwargs.pop("is_active", True),
        }
        std = Standard(tenant_id=tenant_id, sections=sections, **kwargs)
        self.session.add(std)
        await self.session.commit()
        await self.session.refresh(std)
        return _standard_to_dict(std)


def _standard_to_dict(s: Standard) -> dict:
    return {
        "id": s.id,
        "name": s.name,
        "type": s.type,
        "version": s.version or "",
        "description": s.description or "",
        "category": s.sections.get("category", ""),
        "compliance_score": s.sections.get("compliance_score", 0),
        "requirements": s.sections.get("requirements", 0),
        "passed": s.sections.get("passed", 0),
        "is_active": s.sections.get("is_active", True),
        "created_at": s.created_at.isoformat() if s.created_at else "",
        "updated_at": s.updated_at.isoformat() if s.updated_at else "",
    }
