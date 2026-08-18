// src/auth/dto/login.dto.ts
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'El formato del email es inválido' })
  email: string;

  @IsString()
  password: string;
}