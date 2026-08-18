from fastapi import APIRouter, HTTPException, Query

from langflow.api.utils import CurrentActiveUser, DbSession
from langflow.services.operations import ActionTypeService

router = APIRouter(prefix="/operations/action-type", tags=["operations-action-type"])


@router.get("")
async def list_action_types(
    session: DbSession,
    current_user: CurrentActiveUser,
    tenant_id: str | None = Query(None),
):
    service = ActionTypeService(session)
    if tenant_id:
        return await service.list_for_tenant(tenant_id)
    return await service.list_system()


@router.post("")
async def create_action_type(
    session: DbSession,
    current_user: CurrentActiveUser,
    name: str,
    category: str,
    tenant_id: str | None = None,
    icon: str | None = None,
):
    service = ActionTypeService(session)
    return await service.create(name=name, category=category, tenant_id=tenant_id, icon=icon)


@router.get("/{action_type_id}")
async def get_action_type(
    session: DbSession,
    current_user: CurrentActiveUser,
    action_type_id: str,
):
    service = ActionTypeService(session)
    action_type = await service.get(action_type_id)
    if not action_type:
        raise HTTPException(status_code=404, detail="Action type not found")
    return action_type
