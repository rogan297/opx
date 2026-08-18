from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from langflow.api.utils import CurrentActiveUser, DbSession
from langflow.api.utils.tenant import CurrentTenant
from langflow.services.operations import ProductService


class ProductCreate(BaseModel):
    name: str
    price: float
    description: str | None = None
    type: str | None = None


class ProductUpdate(BaseModel):
    name: str | None = None
    price: float | None = None
    description: str | None = None
    type: str | None = None


router = APIRouter(prefix="/operations/product", tags=["operations-product"])


@router.get("")
async def list_products(
    session: DbSession,
    current_user: CurrentActiveUser,
    tenant_id: CurrentTenant,
):
    service = ProductService(session)
    return await service.list_by_tenant(tenant_id)


@router.post("")
async def create_product(
    session: DbSession,
    current_user: CurrentActiveUser,
    tenant_id: CurrentTenant,
    body: ProductCreate,
):
    service = ProductService(session)
    return await service.create(
        tenant_id=tenant_id,
        name=body.name,
        price=body.price,
        description=body.description,
        type=body.type,
    )


@router.get("/{product_id}")
async def get_product(
    session: DbSession,
    current_user: CurrentActiveUser,
    product_id: str,
):
    service = ProductService(session)
    product = await service.get(product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


@router.patch("/{product_id}")
async def update_product(
    session: DbSession,
    current_user: CurrentActiveUser,
    product_id: str,
    body: ProductUpdate,
):
    service = ProductService(session)
    data = body.model_dump(exclude_none=True)
    product = await service.update(product_id, data)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


@router.delete("/{product_id}")
async def delete_product(
    session: DbSession,
    current_user: CurrentActiveUser,
    product_id: str,
):
    service = ProductService(session)
    deleted = await service.delete(product_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"status": "deleted"}
