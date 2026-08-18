import { PreparationStatus } from "@prisma/client";
import { IsEnum, IsInt, IsUUID } from "class-validator";

export class CreateOrderItemDto {

    @IsUUID()
    orderId: string

    @IsUUID()
    productId: string
    
    @IsInt()
    quantity: number

    @IsEnum(PreparationStatus)
    preparationStatus: PreparationStatus

}
