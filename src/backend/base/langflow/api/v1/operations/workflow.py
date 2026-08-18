from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from langflow.api.utils import CurrentActiveUser, DbSession
from langflow.api.utils.tenant import CurrentTenant
from langflow.services.operations import WorkflowService


class WorkflowCreate(BaseModel):
    name: str
    description: str | None = None


router = APIRouter(prefix="/operations/workflow", tags=["operations-workflow"])


@router.get("")
async def list_workflows(
    session: DbSession,
    current_user: CurrentActiveUser,
    tenant_id: CurrentTenant,
):
    service = WorkflowService(session)
    return await service.list_by_tenant(tenant_id)


@router.post("")
async def create_workflow(
    session: DbSession,
    current_user: CurrentActiveUser,
    tenant_id: CurrentTenant,
    body: WorkflowCreate,
):
    service = WorkflowService(session)
    return await service.create(tenant_id=tenant_id, name=body.name, description=body.description)


@router.get("/{workflow_id}")
async def get_workflow(
    session: DbSession,
    current_user: CurrentActiveUser,
    workflow_id: str,
):
    service = WorkflowService(session)
    workflow = await service.get(workflow_id)
    if not workflow:
        raise HTTPException(status_code=404, detail="Workflow not found")
    return workflow


@router.patch("/{workflow_id}/activate")
async def activate_workflow(
    session: DbSession,
    current_user: CurrentActiveUser,
    workflow_id: str,
):
    service = WorkflowService(session)
    workflow = await service.activate(workflow_id)
    if not workflow:
        raise HTTPException(status_code=404, detail="Workflow not found")
    return workflow


@router.patch("/{workflow_id}/pause")
async def pause_workflow(
    session: DbSession,
    current_user: CurrentActiveUser,
    workflow_id: str,
):
    service = WorkflowService(session)
    workflow = await service.pause(workflow_id)
    if not workflow:
        raise HTTPException(status_code=404, detail="Workflow not found")
    return workflow
