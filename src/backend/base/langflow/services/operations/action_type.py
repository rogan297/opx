from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlalchemy import or_

from langflow.services.database.models.operations import ActionType


class ActionTypeService:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def list_for_tenant(self, tenant_id: str | None = None) -> list[ActionType]:
        stmt = select(ActionType).where(
            or_(ActionType.is_system == True, ActionType.tenant_id == tenant_id)
        )
        result = await self.session.exec(stmt)
        return result.all()

    async def list_system(self) -> list[ActionType]:
        stmt = select(ActionType).where(ActionType.is_system == True)
        result = await self.session.exec(stmt)
        return result.all()

    async def get(self, action_type_id: str) -> ActionType | None:
        return await self.session.get(ActionType, action_type_id)

    async def create(self, name: str, category: str, tenant_id: str | None = None, icon: str | None = None) -> ActionType:
        action = ActionType(name=name, category=category, tenant_id=tenant_id, icon=icon)
        self.session.add(action)
        await self.session.commit()
        await self.session.refresh(action)
        return action
