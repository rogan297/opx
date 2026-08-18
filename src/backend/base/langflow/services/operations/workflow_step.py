from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from langflow.services.database.models.operations import WorkflowStep


class WorkflowStepService:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def list_by_workflow(self, workflow_id: str) -> list[WorkflowStep]:
        stmt = select(WorkflowStep).where(WorkflowStep.workflow_id == workflow_id).order_by(WorkflowStep.created_at)
        result = await self.session.exec(stmt)
        return result.all()

    async def get(self, step_id: str) -> WorkflowStep | None:
        return await self.session.get(WorkflowStep, step_id)

    async def create(self, workflow_id: str, action_type_id: str, category: str, config: dict | None = None) -> WorkflowStep:
        step = WorkflowStep(
            workflow_id=workflow_id, action_type_id=action_type_id,
            category=category, config=config or {},
        )
        self.session.add(step)
        await self.session.commit()
        await self.session.refresh(step)
        return step
