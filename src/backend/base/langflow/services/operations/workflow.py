from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from langflow.services.database.models.operations import Workflow


class WorkflowService:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def list_by_tenant(self, tenant_id: str) -> list[Workflow]:
        stmt = select(Workflow).where(Workflow.tenant_id == tenant_id)
        result = await self.session.exec(stmt)
        return result.all()

    async def get(self, workflow_id: str) -> Workflow | None:
        return await self.session.get(Workflow, workflow_id)

    async def create(self, tenant_id: str, name: str, description: str | None = None) -> Workflow:
        workflow = Workflow(name=name, tenant_id=tenant_id, description=description)
        self.session.add(workflow)
        await self.session.commit()
        await self.session.refresh(workflow)
        return workflow

    async def activate(self, workflow_id: str) -> Workflow | None:
        workflow = await self.session.get(Workflow, workflow_id)
        if not workflow:
            return None
        workflow.is_active = True
        workflow.status = "ACTIVE"
        self.session.add(workflow)
        await self.session.commit()
        await self.session.refresh(workflow)
        return workflow

    async def pause(self, workflow_id: str) -> Workflow | None:
        workflow = await self.session.get(Workflow, workflow_id)
        if not workflow:
            return None
        workflow.is_active = False
        workflow.status = "PAUSED"
        self.session.add(workflow)
        await self.session.commit()
        await self.session.refresh(workflow)
        return workflow
