from langflow.custom import Component
from langflow.io import DropdownInput, MessageTextInput, IntInput, Output
from langflow.schema import Data


class StockMovement(Component):
    display_name = "Stock Movement"
    description = "Registra uma movimentação de estoque (entrada/saída)"
    icon = "Move"

    inputs = [
        MessageTextInput(
            name="product_name",
            display_name="Nome do Produto",
            info="Produto a ser movimentado",
        ),
        DropdownInput(
            name="movement_type",
            display_name="Tipo de Movimentação",
            options=["INPUT", "OUTPUT", "PRODUCTION_INPUT", "PRODUCTION_OUTPUT"],
            value="INPUT",
        ),
        IntInput(
            name="quantity",
            display_name="Quantidade",
            value=1,
        ),
        DropdownInput(
            name="reason",
            display_name="Motivo",
            options=["PURCHASE", "SALE", "WASTE", "ADJUSTMENT", "PRODUCTION_FINISH"],
            value="PURCHASE",
        ),
    ]

    outputs = [
        Output(display_name="Movimentação", name="movement", method="register"),
    ]

    def register(self) -> Data:
        product = self.product_name or "Produto"
        mtype = self.movement_type
        qty = self.quantity or 1
        reason = self.reason

        increase_types = ["INPUT", "PRODUCTION_OUTPUT"]
        is_increase = mtype in increase_types
        effect = f"{'+' if is_increase else '-'}{qty}"

        return Data(
            data={
                "product": product,
                "movement_type": mtype,
                "quantity": qty,
                "reason": reason,
                "effect": effect,
                "new_balance": f"Será atualizado após confirmação",
                "is_increase": is_increase,
                "status": "registered",
            }
        )
