from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from langflow.api.utils import CurrentActiveUser, DbSession
from langflow.api.utils.tenant import CurrentTenant
from langflow.services.operations import EmployeeService


class EmployeeCreate(BaseModel):
    name: str
    role: str = ""
    station: str = ""
    email: str = ""
    phone: str = ""
    start_date: str = ""


class EmployeeUpdate(BaseModel):
    name: str | None = None
    role: str | None = None
    station: str | None = None
    is_active: bool | None = None
    email: str | None = None
    phone: str | None = None
    start_date: str | None = None


router = APIRouter(prefix="/operations/employee", tags=["operations-employee"])


@router.get("")
async def list_employees(
    session: DbSession,
    current_user: CurrentActiveUser,
    tenant_id: CurrentTenant,
):
    service = EmployeeService(session)
    return await service.list_by_tenant(tenant_id)


@router.post("")
async def create_employee(
    session: DbSession,
    current_user: CurrentActiveUser,
    tenant_id: CurrentTenant,
    body: EmployeeCreate,
):
    service = EmployeeService(session)
    return await service.create(tenant_id=tenant_id, **body.model_dump())


@router.get("/{employee_id}")
async def get_employee(
    session: DbSession,
    current_user: CurrentActiveUser,
    employee_id: str,
):
    service = EmployeeService(session)
    emp = await service.get(employee_id)
    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")
    return emp


@router.patch("/{employee_id}")
async def update_employee(
    session: DbSession,
    current_user: CurrentActiveUser,
    employee_id: str,
    body: EmployeeUpdate,
):
    service = EmployeeService(session)
    emp = await service.update(employee_id, **{k: v for k, v in body.model_dump().items() if v is not None})
    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")
    return emp


@router.delete("/{employee_id}")
async def delete_employee(
    session: DbSession,
    current_user: CurrentActiveUser,
    employee_id: str,
):
    service = EmployeeService(session)
    deleted = await service.delete(employee_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Employee not found")
    return {"ok": True}
