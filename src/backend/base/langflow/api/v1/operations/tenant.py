from fastapi import APIRouter, HTTPException

from langflow.api.utils import CurrentActiveUser, DbSession
from langflow.api.utils.tenant import CurrentTenant
from langflow.services.operations import TenantService

router = APIRouter(prefix="/operations/tenant", tags=["operations-tenant"])


@router.get("/config")
async def get_tenant_config(
    session: DbSession,
    current_user: CurrentActiveUser,
    tenant_id: CurrentTenant,
):
    service = TenantService(session)
    config = await service.get_config(tenant_id)
    return {"config": config}


@router.get("")
async def list_tenants(
    session: DbSession,
    current_user: CurrentActiveUser,
):
    service = TenantService(session)
    tenants = await service.list_all()
    return tenants


@router.get("/{tenant_id}")
async def get_tenant(
    session: DbSession,
    current_user: CurrentActiveUser,
    tenant_id: str,
):
    service = TenantService(session)
    tenant = await service.get(tenant_id)
    if not tenant:
        raise HTTPException(status_code=404, detail="Tenant not found")
    return tenant
