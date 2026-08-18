import { IsString, IsOptional, IsEnum, IsBoolean } from 'class-validator';
import { StepCategory } from '@prisma/client';

export class CreateActionTypeDto {
  @IsString()
  name: string;

  @IsEnum(StepCategory)
  category: StepCategory;

  @IsOptional()
  @IsString()
  icon?: string;

  @IsOptional()
  @IsBoolean()
  isSystem?: boolean;

  @IsOptional()
  @IsString()
  tenantId?: string;
}
