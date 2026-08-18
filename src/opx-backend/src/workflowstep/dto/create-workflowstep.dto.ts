import { 
  IsString, 
  IsOptional, 
  IsEnum, 
  IsInt, 
  IsJSON, 
  IsUUID, 
  IsObject 
} from 'class-validator';

import { StepCategory } from '@prisma/client'

export class CreateWorkflowStepDto {
  @IsUUID()
  workflowId: string;

  @IsOptional()
  @IsUUID()
  stationId?: string;

  @IsEnum(StepCategory)
  category: StepCategory;

  @IsUUID()
  actionTypeId: string;

  @IsObject()
  @IsOptional()
  config?: Record<string, any>;

  @IsObject()
  @IsOptional()
  inputs?: Record<string, any>;

  @IsInt()
  @IsOptional()
  estimatedTime?: number;

  @IsOptional()
  @IsUUID()
  nextStepId?: string;

  @IsObject()
  @IsOptional()
  branching?: Record<string, any>;
}