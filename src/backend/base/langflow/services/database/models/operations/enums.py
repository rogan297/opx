from enum import Enum


class SectorEnum(str, Enum):
    MANUFACTURING = "MANUFACTURING"
    FOOD_SERVICE = "FOOD_SERVICE"
    LOGISTICS = "LOGISTICS"
    HEALTHCARE = "HEALTHCARE"
    RETAIL = "RETAIL"


class StepCategory(str, Enum):
    ACTION = "ACTION"
    LOGIC = "LOGIC"
    TRANSFORM = "TRANSFORM"


class ProductType(str, Enum):
    RAW_MATERIAL = "RAW_MATERIAL"
    FINISHED_GOOD = "FINISHED_GOOD"


class MovementType(str, Enum):
    INPUT = "INPUT"
    OUTPUT = "OUTPUT"
    PRODUCTION_INPUT = "PRODUCTION_INPUT"
    PRODUCTION_OUTPUT = "PRODUCTION_OUTPUT"


class MovementReason(str, Enum):
    PRODUCTION_FINISH = "PRODUCTION_FINISH"
    SALE = "SALE"
    WASTE = "WASTE"
    ADJUSTMENT = "ADJUSTMENT"
    PURCHASE = "PURCHASE"


class WorkflowStatus(str, Enum):
    DRAFT = "DRAFT"
    ACTIVE = "ACTIVE"
    PAUSED = "PAUSED"
    ERROR = "ERROR"


class ProductionStatus(str, Enum):
    PENDING = "PENDING"
    IN_PROGRESS = "IN_PROGRESS"
    READY = "READY"
    COMPLETED = "COMPLETED"


class OrderStatus(str, Enum):
    PENDING = "PENDING"
    CONFIRMED = "CONFIRMED"
    PREPARING = "PREPARING"
    READY = "READY"
    COMPLETED = "COMPLETED"
    CANCELLED = "CANCELLED"
