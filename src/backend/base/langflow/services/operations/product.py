from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
import decimal

from langflow.services.database.models.operations import Product


class ProductService:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def list_by_tenant(self, tenant_id: str) -> list[Product]:
        stmt = select(Product).where(Product.tenant_id == tenant_id)
        result = await self.session.exec(stmt)
        return result.all()

    async def get(self, product_id: str) -> Product | None:
        return await self.session.get(Product, product_id)

    async def create(self, tenant_id: str, name: str, price: decimal.Decimal, description: str | None = None, type: str | None = None) -> Product:
        product = Product(
            name=name, price=price, tenant_id=tenant_id,
            description=description, type=type or "FINISHED_GOOD",
        )
        self.session.add(product)
        await self.session.commit()
        await self.session.refresh(product)
        return product

    async def update(self, product_id: str, data: dict) -> Product | None:
        product = await self.session.get(Product, product_id)
        if not product:
            return None
        for key, value in data.items():
            setattr(product, key, value)
        self.session.add(product)
        await self.session.commit()
        await self.session.refresh(product)
        return product

    async def delete(self, product_id: str) -> bool:
        product = await self.session.get(Product, product_id)
        if not product:
            return False
        await self.session.delete(product)
        await self.session.commit()
        return True
