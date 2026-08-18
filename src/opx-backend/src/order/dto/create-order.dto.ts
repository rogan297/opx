import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsDecimal, IsEnum, IsString, IsUUID, ValidateNested } from "class-validator";
import { CreateOrderItemDto } from "src/order-item/dto/create-order-item.dto";
import { OrderStatus, PaymentStatus } from "@prisma/client";


export class CreateOrderDto {

    @IsUUID()
    customerId: string

    @IsEnum(OrderStatus)
    status: OrderStatus

    @IsEnum(PaymentStatus)
    paymentStatus: PaymentStatus

    @IsDecimal({ force_decimal: true, decimal_digits: '2', locale: 'en-US' })
    total: string

    @IsUUID()
    tenantId: string

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => CreateOrderItemDto)
    items: CreateOrderItemDto[];

}
