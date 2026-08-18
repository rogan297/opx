import { Module } from '@nestjs/common';
import { ActionTypeService } from './action-type.service';
import { ActionTypeController } from './action-type.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ActionTypeController],
  providers: [ActionTypeService, PrismaService],
  exports: [ActionTypeService],
})
export class ActionTypeModule {}
