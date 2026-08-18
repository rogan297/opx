from typing import Annotated

from fastapi import Depends, HTTPException
from sqlmodel.ext.asyncio.session import AsyncSession

from langflow.api.utils import CurrentActiveUser, DbSession
from langflow.services.database.models.user.model import User


async def get_current_tenant_id(current_user: CurrentActiveUser) -> str:
    tenant_id = current_user.tenant_id
    if not tenant_id:
        raise HTTPException(
            status_code=400,
            detail="User is not assigned to a tenant. Contact an administrator.",
        )
    return tenant_id


async def get_optional_tenant_id(current_user: CurrentActiveUser) -> str | None:
    return current_user.tenant_id


CurrentTenant = Annotated[str, Depends(get_current_tenant_id)]
OptionalTenant = Annotated[str | None, Depends(get_optional_tenant_id)]
