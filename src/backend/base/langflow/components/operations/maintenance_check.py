from langflow.custom import Component
from langflow.io import MessageTextInput, Output
from langflow.schema import Data


class MaintenanceCheck(Component):
    display_name = "Maintenance Check"
    description = "Verifica a saúde de um ativo/equipamento e sugere manutenção"
    icon = "Wrench"

    inputs = [
        MessageTextInput(
            name="asset_name",
            display_name="Nome do Ativo",
            info="Nome do equipamento ou ativo",
        ),
        MessageTextInput(
            name="service_type",
            display_name="Tipo de Serviço",
            info="Tipo de manutenção (opcional)",
        ),
    ]

    outputs = [
        Output(display_name="Diagnóstico", name="diagnosis", method="check"),
    ]

    def check(self) -> Data:
        asset = self.asset_name or "Equipamento"
        service_type = self.service_type or "Manutenção Preventiva"

        mock_assets = {
            "Máquina de Café Expresso": {"health": 92, "uptime": 99.5, "last": "2026-07-01", "next": "2026-08-01"},
            "Forno Industrial": {"health": 78, "uptime": 97.2, "last": "2026-06-15", "next": "2026-07-28"},
            "Geladeira Câmara Fria": {"health": 65, "uptime": 94.8, "last": "2026-05-20", "next": "2026-07-25"},
            "Moedor de Café": {"health": 88, "uptime": 98.9, "last": "2026-07-10", "next": "2026-08-10"},
            "Freezer Horizontal": {"health": 45, "uptime": 88.3, "last": "2026-04-10", "next": "2026-07-20"},
        }

        info = mock_assets.get(asset, {"health": 80, "uptime": 95.0, "last": "N/A", "next": "N/A"})

        if info["health"] >= 90:
            recommendation = "Nenhuma manutenção necessária"
            priority = "baixa"
        elif info["health"] >= 70:
            recommendation = f"Agendar {service_type} em até 30 dias"
            priority = "média"
        elif info["health"] >= 50:
            recommendation = f"{service_type} necessária o quanto antes"
            priority = "alta"
        else:
            recommendation = "Manutenção corretiva urgente"
            priority = "crítica"

        return Data(
            data={
                "asset": asset,
                "health_pct": info["health"],
                "uptime_pct": info["uptime"],
                "last_service": info["last"],
                "next_service": info["next"],
                "priority": priority,
                "recommendation": recommendation,
                "needs_attention": info["health"] < 70,
            }
        )
