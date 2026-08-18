import { IsString, IsBoolean, IsInt, IsOptional } from 'class-validator';

export class CreateStationDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsInt()
  @IsOptional()
  currentLoad?: number;

  @IsString()
  @IsOptional()
  responsible?: string;

  @IsString()
  tenantId: string;
}
