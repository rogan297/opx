from fastapi import APIRouter

from langflow.api.utils import CurrentActiveUser, DbSession
from langflow.api.utils.tenant import CurrentTenant
from langflow.services.operations import DashboardService

router = APIRouter(prefix="/operations/dashboard", tags=["operations-dashboard"])


@router.get("/stats")
async def get_dashboard_stats(
    session: DbSession,
    current_user: CurrentActiveUser,
    tenant_id: CurrentTenant,
):
    service = DashboardService(session)
    return await service.get_stats(tenant_id)


@router.get("/activities")
async def get_dashboard_activities(
    session: DbSession,
    current_user: CurrentActiveUser,
    tenant_id: CurrentTenant,
):
    service = DashboardService(session)
    return await service.get_activities(tenant_id)


@router.get("/production-chart")
async def get_production_chart(
    session: DbSession,
    current_user: CurrentActiveUser,
    tenant_id: CurrentTenant,
):
    service = DashboardService(session)
    return await service.get_production_chart(tenant_id)
