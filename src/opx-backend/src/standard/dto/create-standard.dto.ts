import { IsString, IsOptional, IsUUID } from 'class-validator';

export class CreateStandardDto {
  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  version?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUUID()
  tenantId?: string;
}
