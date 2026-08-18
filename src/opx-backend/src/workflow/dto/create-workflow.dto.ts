import { IsString, IsBoolean, IsOptional, IsArray, IsEnum, IsUUID, ValidateNested } from 'class-validator';
import { WorkflowStatus, StepCategory } from '@prisma/client';
import { Type } from 'class-transformer';

export class WorkflowStepDto {
  @IsUUID()
  id: string;

  @IsOptional()
  @IsEnum(StepCategory)
  category: StepCategory;

  @IsUUID()
  actionTypeId: string;

  @IsOptional()
  @IsUUID()
  nextStepId?: string | null;
}

export class CreateWorkflowDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsUUID()
  tenantId: string;

  @IsOptional()
  @IsEnum(WorkflowStatus)
  status?: WorkflowStatus;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => WorkflowStepDto)
  steps?: WorkflowStepDto[];
}


