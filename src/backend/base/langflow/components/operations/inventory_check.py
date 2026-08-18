from langflow.custom import Component
from langflow.io import DropdownInput, MessageTextInput, IntInput, Output
from langflow.schema import Data


class InventoryCheck(Component):
    display_name = "Inventory Check"
    description = "Verifica e ajusta níveis de estoque de um produto"
    icon = "Warehouse"

    inputs = [
        MessageTextInput(
            name="product_name",
            display_name="Nome do Produto",
            info="Produto para verificar/ajustar estoque",
        ),
        DropdownInput(
            name="operation",
            display_name="Operação",
            options=["check", "adjust", "reorder_alert"],
            value="check",
        ),
        IntInput(
            name="quantity",
            display_name="Quantidade",
            info="Quantidade para ajuste (quando operação = adjust)",
            value=0,
        ),
    ]

    outputs = [
        Output(display_name="Resultado", name="result", method="process"),
    ]

    def process(self) -> Data:
        product = self.product_name or "Produto"
        operation = self.operation
        qty = self.quantity or 0

        mock_data = {
            "Café Arábica": {"available": 3, "threshold": 10, "unit": "kg"},
            "Leite": {"available": 12, "threshold": 8, "unit": "L"},
            "Farinha": {"available": 15, "threshold": 10, "unit": "kg"},
        }

        stock = mock_data.get(product, {"available": 20, "threshold": 10, "unit": "un"})

        if operation == "adjust":
            stock["available"] += qty

        is_critical = stock["available"] <= stock["threshold"]
        is_alert = stock["available"] < stock["threshold"] * 2

        if is_critical:
            status = "critical"
        elif is_alert:
            status = "alert"
        else:
            status = "stable"

        needs_reorder = is_critical

        return Data(
            data={
                "product": product,
                "operation": operation,
                "quantity_available": stock["available"],
                "min_threshold": stock["threshold"],
                "unit": stock["unit"],
                "status": status,
                "needs_reorder": needs_reorder,
                "suggested_reorder_qty": stock["threshold"] * 2 - stock["available"] if needs_reorder else 0,
            }
        )
