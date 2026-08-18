from langflow.custom import Component
from langflow.io import DropdownInput, MessageTextInput, Output
from langflow.schema import Data


class QualityAudit(Component):
    display_name = "Quality Audit"
    description = "Executa auditoria de qualidade contra uma norma/padrão"
    icon = "Shield"

    inputs = [
        MessageTextInput(
            name="standard",
            display_name="Norma / Padrão",
            info="Ex: ISO 9001, ISO 14001, NR-10",
        ),
        DropdownInput(
            name="scope",
            display_name="Escopo da Auditoria",
            options=["Completo", "Rápido", "Por Requisito"],
            value="Completo",
        ),
        MessageTextInput(
            name="item_description",
            display_name="Item / Processo Auditado",
            info="Descrição do item ou processo sendo auditado",
        ),
    ]

    outputs = [
        Output(display_name="Resultado", name="result", method="audit"),
    ]

    def audit(self) -> Data:
        standard = self.standard
        scope = self.scope
        item = self.item_description or "Não especificado"

        mock_scores = {
            "ISO 9001": 87,
            "ISO 14001": 72,
            "ISO 45001": 91,
            "NR-10": 65,
            "AVCB": 100,
        }

        base_score = mock_scores.get(standard, 75)
        if scope == "Rápido":
            score = min(base_score + 10, 100)
        elif scope == "Por Requisito":
            score = min(base_score - 5, 100)
        else:
            score = base_score

        passed = score >= 80

        return Data(
            data={
                "standard": standard,
                "scope": scope,
                "item_audited": item,
                "score": score,
                "passed": passed,
                "status": "approved" if passed else "needs_review",
                "findings": [
                    "Conforme" if passed else "Não conforme",
                    f"Score: {score}%",
                    f"Escopo: {scope}",
                ],
            }
        )
