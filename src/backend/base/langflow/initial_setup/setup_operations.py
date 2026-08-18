from lfx.log.logger import logger
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from langflow.services.database.models.operations import ActionType, Tenant


async def seed_operations_data(session: AsyncSession) -> None:
    existing_action_types = await session.exec(select(ActionType).limit(1))
    if existing_action_types.first():
        await logger.adebug("Operations data already seeded, skipping")
        return

    system_action_types = [
        ("cortar", "fabricacao", "Cutting / Corte"),
        ("soldar", "fabricacao", "Welding / Solda"),
        ("montar", "fabricacao", "Assembly / Montagem"),
        ("pintar", "fabricacao", "Painting / Pintura"),
        ("inspecionar", "qualidade", "Inspection / Inspeção"),
        ("embalar", "logistica", "Packaging / Embalagem"),
        ("expedir", "logistica", "Shipping / Expedição"),
        ("separar", "logistica", "Picking / Separação"),
        ("cozinhar", "producao", "Cooking / Cozimento"),
        ("montar_prato", "producao", "Plating / Montagem do Prato"),
    ]

    for name, category, _display_name in system_action_types:
        action = ActionType(
            name=name,
            category=category,
            is_system=True,
        )
        session.add(action)

    demo_manufacturing = Tenant(
        name="Metalúrgica ABC",
        sector="manufacturing",
        config={
            "modules": ["production_order", "inventory", "quality", "workflow"],
            "vocab": {
                "product": "Peça",
                "order": "Ordem de Produção",
                "station": "Estação de Trabalho",
                "customer": "Cliente",
            },
        },
    )
    session.add(demo_manufacturing)

    demo_food = Tenant(
        name="Restaurante Sabor & Arte",
        sector="food_service",
        config={
            "modules": ["order", "production_order", "inventory"],
            "vocab": {
                "product": "Prato",
                "order": "Comanda",
                "station": "Estação",
                "customer": "Cliente",
            },
        },
    )
    session.add(demo_food)

    await session.commit()
    await logger.adebug("Seeded operations system action types and demo tenants")
