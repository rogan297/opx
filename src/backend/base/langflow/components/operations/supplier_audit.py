from langflow.custom import Component
from langflow.io import MessageTextInput, Output
from langflow.schema import Data


class SupplierAudit(Component):
    display_name = "Supplier Audit"
    description = "Avalia o desempenho de um fornecedor com base em dados mockados"
    icon = "Truck"

    inputs = [
        MessageTextInput(
            name="supplier_name",
            display_name="Nome do Fornecedor",
            info="Nome do fornecedor para auditar",
        ),
        MessageTextInput(
            name="criteria",
            display_name="Critérios da Auditoria",
            info="Ex: qualidade, prazo, preço",
        ),
    ]

    outputs = [
        Output(display_name="Avaliação", name="evaluation", method="evaluate"),
    ]

    def evaluate(self) -> Data:
        supplier = self.supplier_name or "Fornecedor"
        criteria = self.criteria or "qualidade, prazo, preço"

        mock_suppliers = {
            "Café do Brasil Export": {"rating": 4.8, "reliability": 97, "savings": 12},
            "Laticínios Vale Verde": {"rating": 4.5, "reliability": 92, "savings": 8},
            "Hortifruti Orgânico": {"rating": 4.9, "reliability": 99, "savings": 15},
        }

        info = mock_suppliers.get(supplier, {"rating": 4.0, "reliability": 85, "savings": 5})

        score = round((info["rating"] / 5) * 0.4 + (info["reliability"] / 100) * 0.4 + (info["savings"] / 20) * 0.2, 2) * 100

        return Data(
            data={
                "supplier": supplier,
                "criteria": criteria,
                "rating": info["rating"],
                "reliability_pct": info["reliability"],
                "savings_via_ai_pct": info["savings"],
                "audit_score": round(score, 1),
                "recommendation": "approved" if score >= 80 else "needs_review" if score >= 60 else "rejected",
            }
        )
