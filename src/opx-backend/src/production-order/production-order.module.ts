import { Module } from '@nestjs/common';
import { ProductionOrderService } from './production-order.service';
import { ProductionOrderController } from './production-order.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProductionOrderController],
  providers: [ProductionOrderService],
  exports: [ProductionOrderService],
})
export class ProductionOrderModule {}
