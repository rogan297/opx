#!/usr/bin/env python3
"""
Gerador de Documentação do Banco de Dados - Sistema de Restaurante
"""

from fpdf import FPDF
import json
from datetime import datetime

class DatabaseDocPDF(FPDF):
    def header(self):
        self.set_font("Helvetica", "B", 12)
        self.cell(0, 10, "Documentação do Banco de Dados - Sistema de Restaurante", 0, 1, "C")
        self.ln(5)

    def footer(self):
        self.set_y(-15)
        self.set_font("Helvetica", "I", 8)
        self.cell(0, 10, f"Página {self.page_no()} - Gerado em {datetime.now().strftime('%d/%m/%Y %H:%M')}", 0, 0, "C")

    def chapter_title(self, title):
        self.set_font("Helvetica", "B", 14)
        self.set_fill_color(60, 120, 180)
        self.set_text_color(255, 255, 255)
        self.cell(0, 10, f"  {title}", 0, 1, "L", True)
        self.ln(4)
        self.set_text_color(0, 0, 0)

    def section_title(self, title):
        self.set_font("Helvetica", "B", 12)
        self.cell(0, 8, title, 0, 1)
        self.ln(2)

    def body_text(self, text):
        self.set_font("Helvetica", "", 10)
        self.multi_cell(0, 5, text)
        self.ln(2)

    def table_header(self, headers, widths):
        self.set_font("Helvetica", "B", 9)
        self.set_fill_color(200, 220, 240)
        for i, header in enumerate(headers):
            self.cell(widths[i], 7, header, 1, 0, "C", True)
        self.ln()

    def table_row(self, row_data, widths):
        self.set_font("Helvetica", "", 9)
        for i, data in enumerate(row_data):
            self.cell(widths[i], 6, str(data), 1, 0, "L")
        self.ln()

def generate_pdf():
    pdf = DatabaseDocPDF()
    pdf.add_page()
    pdf.set_auto_page_break(auto=True, margin=15)

    # Capa
    pdf.set_font("Helvetica", "B", 24)
    pdf.ln(40)
    pdf.cell(0, 10, "DOCUMENTAÇÃO DO BANCO DE DADOS", 0, 1, "C")
    pdf.set_font("Helvetica", "B", 18)
    pdf.cell(0, 10, "Sistema de Gestão de Restaurante", 0, 1, "C")
    pdf.ln(20)
    pdf.set_font("Helvetica", "", 12)
    pdf.cell(0, 8, f"Gerado em: {datetime.now().strftime('%d de %B de %Y')}", 0, 1, "C")
    pdf.cell(0, 8, f"Banco de Dados: PostgreSQL", 0, 1, "C")
    pdf.cell(0, 8, f"ORM: Prisma", 0, 1, "C")

    # Índice
    pdf.add_page()
    pdf.chapter_title("Índice")
    sections = [
        "1. Visão Geral do Sistema",
        "2. Diagrama Entidade-Relacionamento",
        "3. Modelos (Tabelas)",
        "   3.1. Restaurant (Restaurantes)",
        "   3.2. User (Usuários)",
        "   3.3. Customer (Clientes)",
        "   3.4. Product (Produtos)",
        "   3.5. Inventory (Inventário)",
        "   3.6. StockMovement (Movimentação de Estoque)",
        "   3.7. Order (Pedidos)",
        "   3.8. OrderItem (Itens do Pedido)",
        "   3.9. Station (Estações de Trabalho)",
        "   3.10. StationQueue (Fila de Estações)",
        "   3.11. Workflow (Fluxos de Trabalho)",
        "   3.12. WorkflowNode (Nós do Workflow)",
        "   3.13. WorkflowEdge (Arestas do Workflow)",
        "   3.14. WorkflowInstance (Instâncias de Workflow)",
        "   3.15. ProductionOrder (Ordens de Produção)",
        "   3.16. Standard (Padrões/Checklists)",
        "   3.17. ChecklistTemplate (Templates de Checklist)",
        "   3.18. ProcessStandardAssignment (Atribuição de Padrões)",
        "4. Enums (Enumerações)",
        "5. Relacionamentos e Chaves Estrangeiras",
        "6. Índices e Performance",
        "7. Notas de Implementação",
    ]
    pdf.set_font("Helvetica", "", 11)
    for section in sections:
        pdf.cell(0, 7, section, 0, 1)
        pdf.ln(1)

    # 1. Visão Geral
    pdf.add_page()
    pdf.chapter_title("1. Visão Geral do Sistema")
    pdf.body_text(
        "Este banco de dados foi projetado para um sistema completo de gestão de restaurantes, "
        "suportando múltiplos restaurantes (multi-tenant), controle de estoque, gestão de pedidos, "
        "fluxos de trabalho personalizáveis e controle de qualidade através de padrões e checklists."
    )
    pdf.body_text(
        "Principais funcionalidades atendidas:"
    )
    features = [
        "- Gestão multi-restaurante com isolamento de dados",
        "- Cadastro de usuários com controle de acesso baseado em roles (RBAC)",
        "- Gestão completa de clientes e pedidos",
        "- Controle de estoque com movimentações automáticas",
        "- Gestão de produção com estações de trabalho",
        "- Fluxos de trabalho (workflows) configuráveis",
        "- Controle de qualidade com padrões e checklists",
    ]
    for feature in features:
        pdf.cell(0, 6, feature, 0, 1)

    # 2. Diagrama ER (textual)
    pdf.add_page()
    pdf.chapter_title("2. Diagrama Entidade-Relacionamento")
    pdf.body_text(
        "Abaixo está a representação textual do diagrama ER. Para uma visualização gráfica, "
        "recomenda-se utilizar ferramentas como Prisma Studio, dbdiagram.io ou gerar diagramas "
        "a partir do schema.prisma."
    )

    pdf.section_title("Principais Entidades e Relacionamentos:")
    pdf.set_font("Helvetica", "", 10)

    entities = [
        ("Restaurant", "1:N", "Users, Customers, Products, Orders, Stations, Workflows"),
        ("User", "N:1", "Restaurant (opcional)"),
        ("Customer", "N:1", "Restaurant"),
        ("Customer", "1:N", "Orders"),
        ("Product", "N:1", "Restaurant"),
        ("Product", "1:1", "Inventory"),
        ("Product", "1:N", "OrderItems"),
        ("Order", "N:1", "Customer, Restaurant"),
        ("Order", "1:N", "OrderItems, StockMovements"),
        ("OrderItem", "N:1", "Order, Product"),
        ("OrderItem", "1:1", "ProductionOrder"),
        ("Inventory", "1:N", "StockMovements"),
        ("Station", "1:N", "StationQueue"),
        ("Workflow", "1:N", "WorkflowNodes, WorkflowEdges, Instances"),
        ("ProductionOrder", "1:N", "StationQueue"),
        ("Standard", "1:1", "ChecklistTemplate"),
    ]

    for entity, cardinality, related in entities:
        pdf.cell(50, 6, entity, 1, 0, "L")
        pdf.cell(20, 6, cardinality, 1, 0, "C")
        pdf.cell(0, 6, related, 1, 1, "L")

    # 3. Modelos detalhados
    pdf.add_page()
    pdf.chapter_title("3. Modelos (Tabelas)")

    models = [
        {
            "name": "Restaurant (restaurants)",
            "desc": "Representa um restaurante no sistema multi-tenant. Todos os dados são isolados por restaurantId.",
            "fields": [
                ("id", "String", "UUID", "@default(uuid())"),
                ("name", "String", "-", "-"),
                ("createdAt", "DateTime", "-", "@default(now())"),
                ("updatedAt", "DateTime", "-", "@updatedAt"),
            ],
            "relations": [
                "products: Product[]",
                "customers: Customer[]",
                "orders: Order[]",
                "stations: Station[]",
                "workflows: Workflow[]",
                "users: User[]",
            ]
        },
        {
            "name": "User (users)",
            "desc": "Usuários do sistema com controle de acesso baseado em roles (RBAC).",
            "fields": [
                ("id", "String", "UUID", "@default(uuid())"),
                ("email", "String", "-", "@unique"),
                ("password", "String", "Hash Argon2", "-"),
                ("firstName", "String?", "-", "Opcional"),
                ("lastName", "String?", "-", "Opcional"),
                ("restaurantId", "String?", "-", "FK para Restaurant"),
                ("roles", "String[]", '["admin"]', "RBAC pronto"),
                ("isActive", "Boolean", "true", "Padrão: true"),
                ("createdAt", "DateTime", "-", "@default(now())"),
                ("updatedAt", "DateTime", "-", "@updatedAt"),
            ],
            "relations": ["restaurant: Restaurant? (opcional)"]
        },
        {
            "name": "Customer (customers)",
            "desc": "Clientes do restaurante que realizam pedidos.",
            "fields": [
                ("id", "String", "UUID", "@default(uuid())"),
                ("email", "String?", "-", "@unique, opcional"),
                ("name", "String", "-", "-"),
                ("password", "String?", "-", "Opcional"),
                ("restaurantId", "String", "-", "FK para Restaurant"),
                ("createdAt", "DateTime", "-", "@default(now())"),
                ("updatedAt", "DateTime", "-", "@updatedAt"),
            ],
            "relations": [
                "restaurant: Restaurant",
                "orders: Order[]",
            ]
        },
        {
            "name": "Product (products)",
            "desc": "Produtos do restaurante, podendo ser matéria-prima ou produto acabado.",
            "fields": [
                ("id", "String", "UUID", "@default(uuid())"),
                ("name", "String", "-", "-"),
                ("description", "String?", "-", "Opcional"),
                ("price", "Decimal", "10,2", "Preço"),
                ("type", "ProductType", "FINISHED_GOOD", "Enum"),
                ("restaurantId", "String", "-", "FK para Restaurant"),
                ("createdAt", "DateTime", "-", "@default(now())"),
                ("updatedAt", "DateTime", "-", "@updatedAt"),
            ],
            "relations": [
                "restaurant: Restaurant",
                "inventory: Inventory?",
                "orderItems: OrderItem[]",
            ]
        },
        {
            "name": "Inventory (inventories)",
            "desc": "Controle de estoque de produtos com quantidade disponível e limite mínimo.",
            "fields": [
                ("id", "String", "UUID", "@default(uuid())"),
                ("productId", "String", "-", "@unique, FK para Product"),
                ("quantityAvailable", "Int", "-", "Quantidade atual"),
                ("minThreshold", "Int", "5", "Estoque mínimo"),
                ("lastUpdated", "DateTime", "-", "@updatedAt"),
                ("createdAt", "DateTime", "-", "@default(now())"),
            ],
            "relations": [
                "product: Product @relation(fields: [productId], references: [id], onDelete: Cascade)",
                "movements: StockMovement[]",
            ]
        },
        {
            "name": "StockMovement (stock_movements)",
            "desc": "Registro de todas as movimentações de estoque (entradas, saídas, produção).",
            "fields": [
                ("id", "String", "UUID", "@default(uuid())"),
                ("inventoryId", "String", "-", "FK para Inventory"),
                ("userId", "String", "-", "Quem fez a movimentação"),
                ("orderId", "String?", "-", "FK para Order (opcional)"),
                ("quantity", "Int", "-", "Quantidade movimentada"),
                ("type", "MovementType", "-", "Enum"),
                ("reason", "String?", "-", "Motivo opcional"),
                ("createdAt", "DateTime", "-", "@default(now())"),
            ],
            "relations": [
                "inventory: Inventory",
                "order: Order?",
            ]
        },
        {
            "name": "Order (orders)",
            "desc": "Pedidos realizados pelos clientes.",
            "fields": [
                ("id", "String", "UUID", "@default(uuid())"),
                ("customerId", "String", "-", "FK para Customer"),
                ("status", "OrderStatus", "-", "Enum"),
                ("paymentStatus", "PaymentStatus", "-", "Enum"),
                ("total", "Decimal", "10,2", "Valor total"),
                ("restaurantId", "String", "-", "FK para Restaurant"),
                ("createdAt", "DateTime", "-", "@default(now())"),
                ("updatedAt", "DateTime", "-", "@updatedAt"),
            ],
            "relations": [
                "customer: Customer",
                "restaurant: Restaurant",
                "items: OrderItem[]",
                "stockMovements: StockMovement[]",
            ]
        },
        {
            "name": "OrderItem (order_items)",
            "desc": "Itens individuais de um pedido com controle de preparação.",
            "fields": [
                ("id", "String", "UUID", "@default(uuid())"),
                ("orderId", "String", "-", "FK para Order"),
                ("productId", "String", "-", "FK para Product"),
                ("quantity", "Int", "-", "Quantidade"),
                ("preparationStatus", "PreparationStatus", "-", "Enum"),
                ("startedAt", "DateTime?", "-", "Início preparação"),
                ("finishedAt", "DateTime?", "-", "Fim preparação"),
                ("createdAt", "DateTime", "-", "@default(now())"),
                ("updatedAt", "DateTime", "-", "@updatedAt"),
            ],
            "relations": [
                "order: Order",
                "product: Product",
                "productionOrder: ProductionOrder?",
            ]
        },
        {
            "name": "Station (stations)",
            "desc": "Estações de trabalho onde os itens são preparados (ex: cozinha, grill, expedição).",
            "fields": [
                ("id", "String", "UUID", "@default(uuid())"),
                ("name", "String", "-", "Nome da estação"),
                ("description", "String?", "-", "Opcional"),
                ("isActive", "Boolean", "true", "Ativo/Inativo"),
                ("currentLoad", "Int", "0", "Carga atual"),
                ("responsible", "String?", "-", "Responsável"),
                ("restaurantId", "String", "-", "FK para Restaurant"),
                ("createdAt", "DateTime", "-", "@default(now())"),
                ("updatedAt", "DateTime", "-", "@updatedAt"),
            ],
            "relations": [
                "restaurant: Restaurant",
                "queueItems: StationQueue[]",
            ]
        },
        {
            "name": "StationQueue (station_queue)",
            "desc": "Fila de produção nas estações de trabalho.",
            "fields": [
                ("id", "String", "UUID", "@default(uuid())"),
                ("stationId", "String", "-", "FK para Station"),
                ("productionOrderId", "String", "-", "FK para ProductionOrder"),
                ("enteredAt", "DateTime", "-", "@default(now())"),
                ("exitedAt", "DateTime?", "-", "Quando saiu da fila"),
            ],
            "relations": [
                "station: Station",
                "productionOrder: ProductionOrder",
            ]
        },
        {
            "name": "Workflow (workflows)",
            "desc": "Fluxos de trabalho configuráveis para automatizar processos do restaurante.",
            "fields": [
                ("id", "String", "UUID", "@default(uuid())"),
                ("name", "String", "-", "Nome do workflow"),
                ("description", "String?", "-", "Opcional"),
                ("isActive", "Boolean", "true", "Ativo/Inativo"),
                ("status", "WorkflowStatus", "DRAFT", "Enum"),
                ("restaurantId", "String", "-", "FK para Restaurant"),
                ("createdAt", "DateTime", "-", "@default(now())"),
                ("updatedAt", "DateTime", "-", "@updatedAt"),
            ],
            "relations": [
                "restaurant: Restaurant",
                "instances: WorkflowInstance[]",
                "nodes: WorkflowNode[]",
                "edges: WorkflowEdge[]",
            ]
        },
        {
            "name": "WorkflowNode (workflow_nodes)",
            "desc": "Nós que compõem um workflow (ações, lógicas, transformações).",
            "fields": [
                ("id", "String", "UUID", "@default(uuid())"),
                ("workflowId", "String", "-", "FK para Workflow"),
                ("type", "String", "-", "Tipo do nó"),
                ("name", "String", "-", "Nome do nó"),
                ("config", "Json", "{}", "Configurações"),
            ],
            "relations": [
                "workflow: Workflow @relation(fields: [workflowId], references: [id], onDelete: Cascade)",
                "sourceEdges: WorkflowEdge[] @relation('SourceNode')",
                "targetEdges: WorkflowEdge[] @relation('TargetNode')",
            ]
        },
        {
            "name": "WorkflowEdge (workflow_edges)",
            "desc": "Arestas que conectam os nós do workflow, definindo o fluxo.",
            "fields": [
                ("id", "String", "UUID", "@default(uuid())"),
                ("workflowId", "String", "-", "FK para Workflow"),
                ("sourceNodeId", "String", "-", "Nó de origem"),
                ("targetNodeId", "String", "-", "Nó de destino"),
                ("condition", "String?", "-", "Condição (ex: success, error)"),
            ],
            "relations": [
                "workflow: Workflow @relation(fields: [workflowId], references: [id], onDelete: Cascade)",
                "sourceNode: WorkflowNode @relation('SourceNode')",
                "targetNode: WorkflowNode @relation('TargetNode')",
            ]
        },
        {
            "name": "WorkflowInstance (workflow_instances)",
            "desc": "Instâncias em execução de um workflow, contendo o estado atual e contexto.",
            "fields": [
                ("id", "String", "UUID", "@default(uuid())"),
                ("workflowId", "String", "-", "FK para Workflow"),
                ("status", "String", "-", "RUNNING, COMPLETED, etc."),
                ("context", "Json", "{}", "Dados entre nós"),
                ("currentNodeId", "String?", "-", "Nó atual"),
                ("createdAt", "DateTime", "-", "@default(now())"),
                ("updatedAt", "DateTime", "-", "@updatedAt"),
            ],
            "relations": ["workflow: Workflow"]
        },
        {
            "name": "ProductionOrder (production_orders)",
            "desc": "Ordens de produção vinculadas a itens do pedido para controle na cozinha.",
            "fields": [
                ("id", "String", "UUID", "@default(uuid())"),
                ("orderItemId", "String", "-", "@unique, FK para OrderItem"),
                ("status", "ProductionStatus", "PENDING", "Enum"),
                ("startedAt", "DateTime?", "-", "Início"),
                ("finishedAt", "DateTime?", "-", "Fim"),
                ("createdAt", "DateTime", "-", "@default(now())"),
                ("updatedAt", "DateTime", "-", "@updatedAt"),
            ],
            "relations": [
                "orderItem: OrderItem @relation(fields: [orderItemId], references: [id])",
                "queueItems: StationQueue[]",
            ]
        },
        {
            "name": "Standard (standards)",
            "desc": "Padrões de qualidade e processos com código e categoria.",
            "fields": [
                ("id", "String", "UUID", "@default(uuid())"),
                ("name", "String", "-", "Nome do padrão"),
                ("code", "String", "-", "@unique"),
                ("descrition", "String?", "-", "Descrição (nota: campo com typo no schema)"),
                ("category", "String", "-", "Categoria"),
                ("version", "String", "1.0", "Versão"),
                ("createdAt", "DateTime", "-", "@default(now())"),
                ("updatedAt", "DateTime", "-", "@updatedAt"),
            ],
            "relations": [
                "checklist: ChecklistTemplate?",
                "processSteps: ProcessStandardAssignment[]",
            ]
        },
        {
            "name": "ChecklistTemplate (checklist_templates)",
            "desc": "Templates de checklist vinculados a padrões de qualidade.",
            "fields": [
                ("id", "String", "UUID", "@default(uuid())"),
                ("standardId", "String", "-", "@unique, FK para Standard"),
                ("schema", "Json", "-", "Esquema do checklist"),
                ("createdAt", "DateTime", "-", "@default(now())"),
                ("updatedAt", "DateTime", "-", "@updatedAt"),
            ],
            "relations": ["standard: Standard @relation(fields: [standardId], references: [id])"]
        },
        {
            "name": "ProcessStandardAssignment (process_standard_assignments)",
            "desc": "Atribuição de padrões de qualidade a etapas de processos.",
            "fields": [
                ("id", "String", "UUID", "@default(uuid())"),
                ("standardId", "String", "-", "FK para Standard"),
                ("stepId", "String", "-", "ID da etapa"),
                ("processId", "String", "-", "ID do processo"),
            ],
            "relations": [
                "standard: Standard @relation(fields: [standardId], references: [id])",
                "@@unique([stepId, standardId])",
            ]
        },
    ]

    for model in models:
        if pdf.get_y() > 250:
            pdf.add_page()

        pdf.section_title(model["name"])
        pdf.body_text(model["desc"])

        # Tabela de campos
        pdf.set_font("Helvetica", "B", 9)
        pdf.cell(0, 6, "Campos:", 0, 1)
        pdf.table_header(["Campo", "Tipo", "Padrão/Notas", "Atributos"], [50, 40, 50, 50])

        for field in model["fields"]:
            pdf.table_row(field, [50, 40, 50, 50])

        pdf.ln(3)

        # Relacionamentos
        if model["relations"]:
            pdf.set_font("Helvetica", "B", 9)
            pdf.cell(0, 6, "Relacionamentos:", 0, 1)
            pdf.set_font("Helvetica", "", 9)
            for rel in model["relations"]:
                pdf.cell(0, 5, f"  - {rel}", 0, 1)

        pdf.ln(5)

    # 4. Enums
    pdf.add_page()
    pdf.chapter_title("4. Enums (Enumerações)")

    enums = [
        ("OrderStatus", ["PENDING", "CONFIRMED", "PREPARING", "READY", "COMPLETED", "CANCELLED"],
         "Status do pedido"),
        ("PaymentStatus", ["PENDING", "PAID", "FAILED", "REFUNDED"],
         "Status do pagamento"),
        ("PreparationStatus", ["PENDING", "IN_PROGRESS", "READY", "COMPLETED"],
         "Status de preparação do item"),
        ("ProductType", ["RAW_MATERIAL", "FINISHED_GOOD"],
         "Tipo de produto (matéria-prima ou acabado)"),
        ("MovementType", ["INPUT", "OUTPUT", "PRODUCTION_INPUT", "PRODUCTION_OUTPUT"],
         "Tipo de movimentação de estoque"),
        ("MovementReason", ["PRODUCTION_FINISH", "SALE", "WASTE", "ADJUSTMENT", "PURCHASE"],
         "Motivo da movimentação"),
        ("WorkflowStatus", ["DRAFT", "ACTIVE", "PAUSED"],
         "Status do workflow"),
        ("ProductionStatus", ["PENDING", "IN_PROGRESS", "READY", "COMPLETED"],
         "Status da ordem de produção"),
        ("StepCategory", ["ACTION", "LOGIC", "TRANSFORM"],
         "Categoria do nó no workflow (ação, lógica, transformação)"),
        ("StepActionType", ["PREPARE", "COOK", "ASSEMBLE", "FRY", "GRILL", "PACK", "EXPEDITE"],
         "Tipos de ação na preparação"),
    ]

    for enum_name, values, description in enums:
        if pdf.get_y() > 260:
            pdf.add_page()
        pdf.set_font("Helvetica", "B", 10)
        pdf.cell(0, 6, f"{enum_name}: {description}", 0, 1)
        pdf.set_font("Helvetica", "", 9)
        for value in values:
            pdf.cell(0, 5, f"  - {value}", 0, 1)
        pdf.ln(2)

    # 5. Relacionamentos
    pdf.add_page()
    pdf.chapter_title("5. Relacionamentos e Chaves Estrangeiras")

    relationships = [
        ("Restaurant -> User", "One-to-Many", "restaurantId em User referencia id em Restaurant (opcional)"),
        ("Restaurant -> Customer", "One-to-Many", "restaurantId em Customer referencia id em Restaurant"),
        ("Restaurant -> Product", "One-to-Many", "restaurantId em Product referencia id em Restaurant"),
        ("Restaurant -> Order", "One-to-Many", "restaurantId em Order referencia id em Restaurant"),
        ("Restaurant -> Station", "One-to-Many", "restaurantId em Station referencia id em Restaurant"),
        ("Restaurant -> Workflow", "One-to-Many", "restaurantId em Workflow referencia id em Restaurant"),
        ("Customer -> Order", "One-to-Many", "customerId em Order referencia id em Customer"),
        ("Product -> Inventory", "One-to-One", "productId em Inventory referencia id em Product (único)"),
        ("Product -> OrderItem", "One-to-Many", "productId em OrderItem referencia id em Product"),
        ("Order -> OrderItem", "One-to-Many", "orderId em OrderItem referencia id em Order"),
        ("OrderItem -> ProductionOrder", "One-to-One", "orderItemId em ProductionOrder referencia id em OrderItem"),
        ("Inventory -> StockMovement", "One-to-Many", "inventoryId em StockMovement referencia id em Inventory"),
        ("Station -> StationQueue", "One-to-Many", "stationId em StationQueue referencia id em Station"),
        ("ProductionOrder -> StationQueue", "One-to-Many", "productionOrderId em StationQueue referencia id em ProductionOrder"),
        ("Workflow -> WorkflowNode", "One-to-Many", "workflowId em WorkflowNode referencia id em Workflow (Cascade)"),
        ("Workflow -> WorkflowEdge", "One-to-Many", "workflowId em WorkflowEdge referencia id em Workflow (Cascade)"),
        ("Workflow -> WorkflowInstance", "One-to-Many", "workflowId em WorkflowInstance referencia id em Workflow"),
        ("Standard -> ChecklistTemplate", "One-to-One", "standardId em ChecklistTemplate referencia id em Standard (único)"),
    ]

    pdf.table_header(["Relacionamento", "Cardinalidade", "Detalhes"], [60, 40, 90])
    for rel in relationships:
        pdf.table_row(rel, [60, 40, 90])

    # 6. Índices
    pdf.add_page()
    pdf.chapter_title("6. Índices e Performance")

    pdf.body_text(
        "O schema inclui índices em campos frequentemente consultados para melhorar a performance. "
        "Todos os índices são criados automaticamente pelo Prisma através do modificador @@index."
    )

    indexes = [
        ("customers", "restaurantId", "Consultas de clientes por restaurante"),
        ("products", "restaurantId", "Consultas de produtos por restaurante"),
        ("orders", "customerId", "Consultas de pedidos por cliente"),
        ("orders", "restaurantId", "Consultas de pedidos por restaurante"),
        ("stock_movements", "inventoryId", "Histórico de movimentações por item"),
        ("order_items", "orderId", "Itens de um pedido específico"),
        ("order_items", "productId", "Pedidos que contêm um produto"),
        ("stations", "restaurantId", "Estações por restaurante"),
        ("station_queue", "stationId", "Fila por estação"),
        ("station_queue", "productionOrderId", "Estações por ordem de produção"),
    ]

    pdf.table_header(["Tabela", "Campo Indexado", "Propósito"], [50, 50, 90])
    for idx in indexes:
        pdf.table_row(idx, [50, 50, 90])

    # 7. Notas de Implementação
    pdf.add_page()
    pdf.chapter_title("7. Notas de Implementação")

    notes = [
        ("Multi-tenancy", "Todas as entidades principais (Customer, Product, Order, etc.) possuem restaurantId para isolamento de dados entre restaurantes."),
        ("Soft Delete", "O sistema não implementa soft delete nativo. Use o campo isActive em User e Station para desativar registros."),
        ("Cascata", "Product -> Inventory e Product -> OrderItem usam onDelete: Cascade. Ao deletar um produto, seu inventário e relacionamentos em workflows são removidos."),
        ("Workflow Engine", "O WorkflowInstance possui um campo 'context' do tipo Json que atua como o 'cérebro' da execução, armazenando dados que fluem entre nós."),
        ("Tipos Monetários", "Valores monetários (price, total) usam Decimal(10,2) para precisão financeira."),
        ("Autenticação", "Senhas de usuários usam hash Argon2 (conforme comentário no schema)."),
        ("Tipos de Produto", "ProductType diferencia entre RAW_MATERIAL (insumos) e FINISHED_GOOD (produtos prontos)."),
        ("Movimentação de Estoque", "MovementType suporta INPUT (compra), OUTPUT (venda/desperdício), PRODUCTION_INPUT (uso na produção) e PRODUCTION_OUTPUT (saída do forno)."),
        ("Padrões de Qualidade", "O sistema inclui Standard e ChecklistTemplate para controle de qualidade e processos."),
        ("Observação no Schema", "O campo 'descrition' em Standard parece ter um erro de digitação (deveria ser 'description').",
         "NOTA: Considere corrigir no schema.prisma."),
    ]

    for note in notes:
        if len(note) == 2:
            title, desc = note
            pdf.set_font("Helvetica", "B", 10)
            pdf.cell(0, 6, f"{title}:", 0, 1)
            pdf.set_font("Helvetica", "", 10)
            pdf.multi_cell(0, 5, desc)
            pdf.ln(3)
        else:
            title, desc, note_text = note
            pdf.set_font("Helvetica", "B", 10)
            pdf.cell(0, 6, f"{title}:", 0, 1)
            pdf.set_font("Helvetica", "", 10)
            pdf.multi_cell(0, 5, desc)
            pdf.set_text_color(200, 0, 0)
            pdf.multi_cell(0, 5, note_text)
            pdf.set_text_color(0, 0, 0)
            pdf.ln(3)

    # Salvar PDF
    output_path = "/home/rogan/Documents/opx/prisma/documentacao_banco_dados.pdf"
    pdf.output(output_path)
    print(f"Documentação gerada com sucesso: {output_path}")
    return output_path

if __name__ == "__main__":
    generate_pdf()
