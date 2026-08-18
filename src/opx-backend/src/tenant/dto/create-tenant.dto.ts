import { Prisma, SectorEnum } from '@prisma/client';
import { IsString, IsOptional, IsEnum, IsObject } from 'class-validator';

export class CreateTenantDto implements Prisma.TenantCreateInput {
  @IsString()
  name: string;

  @IsOptional()
  @IsEnum(SectorEnum)
  sector?: SectorEnum;

  @IsOptional()
  @IsObject()
  config?: Record<string, any>;
}
