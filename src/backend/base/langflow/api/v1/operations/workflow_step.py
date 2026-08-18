from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from langflow.api.utils import CurrentActiveUser, DbSession
from langflow.services.operations import WorkflowStepService


class WorkflowStepCreate(BaseModel):
    workflow_id: str
    action_type_id: str
    category: str
    config: dict | None = None


router = APIRouter(prefix="/operations/workflow-step", tags=["operations-workflow-step"])


@router.get("/workflow/{workflow_id}")
async def list_steps_by_workflow(
    session: DbSession,
    current_user: CurrentActiveUser,
    workflow_id: str,
):
    service = WorkflowStepService(session)
    return await service.list_by_workflow(workflow_id)


@router.post("")
async def create_step(
    session: DbSession,
    current_user: CurrentActiveUser,
    body: WorkflowStepCreate,
):
    service = WorkflowStepService(session)
    return await service.create(
        workflow_id=body.workflow_id,
        action_type_id=body.action_type_id,
        category=body.category,
        config=body.config,
    )


@router.get("/{step_id}")
async def get_step(
    session: DbSession,
    current_user: CurrentActiveUser,
    step_id: str,
):
    service = WorkflowStepService(session)
    step = await service.get(step_id)
    if not step:
        raise HTTPException(status_code=404, detail="Workflow step not found")
    return step
