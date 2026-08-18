import { IsEnum, IsInt, IsOptional, IsString, IsUUID, Min } from 'class-validator';
import { MovementType } from '@prisma/client'; // Importa el Enum generado por Prisma

export class CreateStockmovementDto {
  @IsUUID()
  @IsString()
  inventoryId: string;

  @IsInt()
  @Min(1, { message: 'A quantidade deve ser pelo menos 1' })
  quantity: number;

  @IsEnum(MovementType, {
    message: 'O tipo deve ser: INPUT, OUTPUT, PRODUCTION_INPUT ou PRODUCTION_OUTPUT',
  })
  type: MovementType;

  @IsOptional()
  @IsString()
  reason?: string;

  @IsOptional()
  @IsUUID()
  orderId?: string;

  // El userId normalmente se saca del token JWT en el request, 
  // pero si lo envías manualmente, descomenta la siguiente línea:
  @IsUUID()
  userId: string;
}