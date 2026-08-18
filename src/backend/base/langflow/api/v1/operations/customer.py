from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from langflow.api.utils import CurrentActiveUser, DbSession
from langflow.api.utils.tenant import CurrentTenant
from langflow.services.operations import CustomerService


class CustomerCreate(BaseModel):
    name: str
    email: str | None = None


router = APIRouter(prefix="/operations/customer", tags=["operations-customer"])


@router.get("")
async def list_customers(
    session: DbSession,
    current_user: CurrentActiveUser,
    tenant_id: CurrentTenant,
):
    service = CustomerService(session)
    return await service.list_by_tenant(tenant_id)


@router.post("")
async def create_customer(
    session: DbSession,
    current_user: CurrentActiveUser,
    tenant_id: CurrentTenant,
    body: CustomerCreate,
):
    service = CustomerService(session)
    return await service.create(tenant_id=tenant_id, name=body.name, email=body.email)


@router.get("/{customer_id}")
async def get_customer(
    session: DbSession,
    current_user: CurrentActiveUser,
    customer_id: str,
):
    service = CustomerService(session)
    customer = await service.get(customer_id)
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    return customer
