from langflow.custom import Component
from langflow.io import DropdownInput, MessageTextInput, Output
from langflow.schema import Data


class ProductionOrder(Component):
    display_name = "Production Order"
    description = "Dispara, avança ou completa uma ordem de produção"
    icon = "Factory"

    inputs = [
        MessageTextInput(
            name="order_id",
            display_name="ID da Ordem",
            info="Identificador da ordem de produção",
        ),
        DropdownInput(
            name="action",
            display_name="Ação",
            options=["start", "advance", "complete", "cancel"],
            value="start",
        ),
        MessageTextInput(
            name="product_name",
            display_name="Nome do Produto",
            info="Produto a ser produzido",
        ),
    ]

    outputs = [
        Output(display_name="Status", name="status", method="execute"),
    ]

    def execute(self) -> Data:
        order_id = self.order_id or f"PO-{hash(self.product_name) % 10000:04d}"
        action = self.action
        product = self.product_name or "Produto"

        status_map = {
            "start": {"status": "IN_PROGRESS", "message": f"Ordem {order_id} iniciada"},
            "advance": {"status": "ADVANCED", "message": f"Ordem {order_id} avançou para próxima estação"},
            "complete": {"status": "COMPLETED", "message": f"Ordem {order_id} completada"},
            "cancel": {"status": "CANCELLED", "message": f"Ordem {order_id} cancelada"},
        }

        result = status_map.get(action, {"status": "UNKNOWN", "message": "Ação inválida"})

        return Data(
            data={
                "order_id": order_id,
                "product": product,
                "action": action,
                "status": result["status"],
                "message": result["message"],
                "current_station": "Montagem" if action == "start" else "Finalização",
                "elapsed_time": "0 min" if action == "start" else "15 min",
            }
        )
