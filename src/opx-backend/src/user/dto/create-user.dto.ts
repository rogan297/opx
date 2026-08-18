import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsEmail, IsOptional, IsString, IsStrongPassword, IsUUID, MinLength } from "class-validator";

export class CreateUserDto {
    @ApiProperty({ example: 'user@example.com' })
    @IsEmail({}, { message: 'O e-mail fornecido é inválido' })
    email: string;

    @ApiProperty({ example: 'SenhaForte123' })
    @IsString()
    @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres' })
    password: string;

    @ApiPropertyOptional({ example: 'João' })
    @IsString()
    @IsOptional()
    firstName?: string;

    @ApiPropertyOptional({ example: 'Silva' })
    @IsString()
    @IsOptional()
    lastName?: string;

    @IsUUID()
    @IsOptional()
    tenantId?: string;

    @ApiPropertyOptional({ example: ['admin'], default: ['admin'] })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    roles?: string[];

    @ApiPropertyOptional({ default: true })
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}
