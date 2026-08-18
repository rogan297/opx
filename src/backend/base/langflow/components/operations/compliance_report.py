from langflow.custom import Component
from langflow.io import DropdownInput, MessageTextInput, Output
from langflow.schema import Data


class ComplianceReport(Component):
    display_name = "Compliance Report"
    description = "Gera um relatório de conformidade para uma norma/padrão"
    icon = "ClipboardCheck"

    inputs = [
        MessageTextInput(
            name="standard_name",
            display_name="Nome da Norma",
            info="Ex: ISO 9001, ISO 14001, NR-10, AVCB",
        ),
        DropdownInput(
            name="report_type",
            display_name="Tipo de Relatório",
            options=["completo", "resumo", "nao_conformidades"],
            value="resumo",
        ),
    ]

    outputs = [
        Output(display_name="Relatório", name="report", method="generate"),
    ]

    def generate(self) -> Data:
        standard = self.standard_name or "ISO 9001"
        report_type = self.report_type

        mock_standards = {
            "ISO 9001": {"score": 87, "passed": 36, "total": 42, "category": "Qualidade"},
            "ISO 14001": {"score": 72, "passed": 20, "total": 28, "category": "Ambiental"},
            "ISO 45001": {"score": 91, "passed": 32, "total": 35, "category": "Segurança"},
            "NR-10": {"score": 65, "passed": 12, "total": 18, "category": "Segurança"},
            "AVCB": {"score": 100, "passed": 15, "total": 15, "category": "Segurança"},
        }

        info = mock_standards.get(standard, {"score": 75, "passed": 15, "total": 20, "category": "Geral"})
        pct = round((info["passed"] / info["total"]) * 100, 1) if info["total"] > 0 else 0

        if report_type == "nao_conformidades":
            data = {
                "standard": standard,
                "report_type": report_type,
                "non_conformities": info["total"] - info["passed"],
                "critical_findings": max(0, info["total"] - info["passed"] - 2),
                "recommendations": [
                    "Revisar procedimentos documentados",
                    "Realizar treinamento da equipe",
                    "Agendar nova auditoria em 30 dias",
                ],
            }
        elif report_type == "completo":
            data = {
                "standard": standard,
                "report_type": report_type,
                "compliance_score": info["score"],
                "requirements_passed": info["passed"],
                "requirements_total": info["total"],
                "compliance_pct": pct,
                "category": info["category"],
                "status": "conforme" if info["score"] >= 80 else "nao_conforme",
            }
        else:
            data = {
                "standard": standard,
                "report_type": report_type,
                "compliance_score": info["score"],
                "compliance_pct": pct,
                "status": "conforme" if info["score"] >= 80 else "nao_conforme",
                "summary": f"{info['passed']}/{info['total']} requisitos atendidos",
            }

        return Data(data=data)
