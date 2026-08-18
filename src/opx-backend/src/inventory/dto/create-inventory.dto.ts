import { IsInt, IsNotEmpty, IsNumber, IsString, IsUUID, Min, min, minLength } from "class-validator";

export class CreateInventoryDto {

    @IsUUID()
    productId: string

    @IsInt()
    @Min(0)
    @IsNotEmpty()
    quantityAvailable: number

    
}
