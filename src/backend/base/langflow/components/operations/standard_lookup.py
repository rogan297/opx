from langflow.custom import Component
from langflow.io import DropdownInput, MessageTextInput, Output
from langflow.schema import Data


class StandardLookup(Component):
    display_name = "Standard Lookup"
    description = "Busca requisitos e seções de uma norma/padrão"
    icon = "FileText"

    inputs = [
        DropdownInput(
            name="standard_name",
            display_name="Norma",
            options=["ISO 9001", "ISO 14001", "ISO 45001", "ISO 27001", "NR-10", "AVCB"],
            value="ISO 9001",
        ),
        MessageTextInput(
            name="section",
            display_name="Seção (opcional)",
            info="Filtrar por seção específica",
        ),
    ]

    outputs = [
        Output(display_name="Requisitos", name="requirements", method="lookup"),
    ]

    def lookup(self) -> Data:
        standard = self.standard_name
        section_filter = self.section

        mock_requirements = {
            "ISO 9001": [
                {"id": "Q1", "section": "4.1", "title": "Contexto da organização", "status": "conforme"},
                {"id": "Q2", "section": "5.1", "title": "Liderança e comprometimento", "status": "conforme"},
                {"id": "Q3", "section": "6.1", "title": "Planejamento", "status": "nao_conforme"},
                {"id": "Q4", "section": "7.1", "title": "Recursos", "status": "conforme"},
                {"id": "Q5", "section": "8.1", "title": "Operação", "status": "nao_conforme"},
                {"id": "Q6", "section": "9.1", "title": "Avaliação de desempenho", "status": "conforme"},
            ],
            "ISO 14001": [
                {"id": "A1", "section": "4.1", "title": "Requisitos gerais", "status": "conforme"},
                {"id": "A2", "section": "6.1", "title": "Aspectos ambientais", "status": "nao_conforme"},
            ],
        }

        reqs = mock_requirements.get(standard, [{"id": "N/A", "section": "N/A", "title": "Padrão não encontrado", "status": "unknown"}])

        if section_filter:
            reqs = [r for r in reqs if section_filter.lower() in r["section"].lower() or section_filter.lower() in r["title"].lower()]

        total = len(reqs)
        passed = sum(1 for r in reqs if r["status"] == "conforme")

        return Data(
            data={
                "standard": standard,
                "section_filter": section_filter or "todas",
                "total_requirements": total,
                "conformant": passed,
                "non_conformant": total - passed,
                "requirements": reqs,
                "summary": f"{passed}/{total} requisitos conformes",
            }
        )
