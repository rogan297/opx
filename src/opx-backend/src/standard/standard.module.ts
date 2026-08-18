import { Module } from '@nestjs/common';
import { StandardService } from './standard.service';
import { StandardController } from './standard.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [StandardController],
  providers: [StandardService, PrismaService],
})
export class StandardModule {}
