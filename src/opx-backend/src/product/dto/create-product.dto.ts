import { IsDecimal, IsString, IsUUID, IsOptional, IsNumber} from "class-validator";

export class CreateProductDto {
    
    @IsString()
    name: string

    @IsDecimal({ force_decimal: true, decimal_digits: '2', locale: 'en-US' })
    price: string

    @IsUUID()
    tenantId: string

    
    @IsOptional()
    @IsUUID()
    inventoryId?: string

    @IsOptional()
    @IsString()
    description?: string
}
