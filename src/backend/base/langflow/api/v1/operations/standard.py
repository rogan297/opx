from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from langflow.api.utils import CurrentActiveUser, DbSession
from langflow.api.utils.tenant import CurrentTenant
from langflow.services.operations import StandardService


class StandardCreate(BaseModel):
    name: str
    type: str
    version: str | None = None
    description: str | None = None
    category: str = ""
    compliance_score: int = 0
    requirements: int = 0
    passed: int = 0
    is_active: bool = True


router = APIRouter(prefix="/operations/standard", tags=["operations-standard"])


@router.get("")
async def list_standards(
    session: DbSession,
    current_user: CurrentActiveUser,
    tenant_id: CurrentTenant,
):
    service = StandardService(session)
    return await service.list_by_tenant(tenant_id)


@router.post("")
async def create_standard(
    session: DbSession,
    current_user: CurrentActiveUser,
    tenant_id: CurrentTenant,
    body: StandardCreate,
):
    service = StandardService(session)
    return await service.create(tenant_id=tenant_id, **body.model_dump())
