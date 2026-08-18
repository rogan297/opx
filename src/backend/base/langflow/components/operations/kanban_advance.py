from langflow.custom import Component
from langflow.io import DropdownInput, MessageTextInput, Output
from langflow.schema import Data


class KanbanAdvance(Component):
    display_name = "Kanban Advance"
    description = "Avança uma ordem de produção no Kanban entre as colunas"
    icon = "Columns3"

    inputs = [
        MessageTextInput(
            name="order_id",
            display_name="ID da Ordem",
            info="Identificador da ordem de produção",
        ),
        DropdownInput(
            name="target_status",
            display_name="Status de Destino",
            options=["PENDING", "IN_PROGRESS", "READY", "COMPLETED"],
            value="IN_PROGRESS",
        ),
        MessageTextInput(
            name="station_name",
            display_name="Nome da Estação",
            info="Estação para onde a ordem está sendo enviada",
        ),
    ]

    outputs = [
        Output(display_name="Resultado", name="result", method="advance"),
    ]

    def advance(self) -> Data:
        order_id = self.order_id or "PO-0000"
        target = self.target_status
        station = self.station_name or "Estação Principal"

        status_stations = {
            "PENDING": "Fila de Espera",
            "IN_PROGRESS": "Em Produção",
            "READY": "Finalização",
            "COMPLETED": "Entregue",
        }

        return Data(
            data={
                "order_id": order_id,
                "previous_status": "PENDING",
                "new_status": target,
                "station": station,
                "station_display": status_stations.get(target, target),
                "elapsed_time": "5 min",
                "success": True,
            }
        )
