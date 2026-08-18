import { IsString, IsOptional } from 'class-validator';

export class CreateProductionOrderDto {
  @IsString()
  orderItemId: string;

  @IsString()
  workflowId: string;

  @IsString()
  @IsOptional()
  currentStepId?: string;
}
