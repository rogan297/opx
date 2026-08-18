import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { TenantModule } from './tenant/tenant.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { CustomerModule } from './customer/customer.module';
import { ProductModule } from './product/product.module';
import { InventoryModule } from './inventory/inventory.module';
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './order-item/order-item.module';
import { UserModule } from './user/user.module';
import { TransporterModule } from './transporter/transporter.module';
import { StockmovementModule } from './stockmovement/stockmovement.module';
import { StationModule } from './station/station.module';
import { WorkflowModule } from './workflow/workflow.module';
import { ProductionOrderModule } from './production-order/production-order.module';
import { StationQueueModule } from './station-queue/station-queue.module';
import { WorkflowstepModule } from './workflowstep/workflowstep.module';
import { StandardModule } from './standard/standard.module';
import { ActionTypeModule } from './action-type/action-type.module';

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule, TenantModule, AuthModule, CustomerModule, ProductModule,
    InventoryModule, OrderModule, OrderItemModule, UserModule, TransporterModule,
    StockmovementModule, StationModule, WorkflowModule, ProductionOrderModule,
    StationQueueModule, WorkflowstepModule, StandardModule, ActionTypeModule,
  ],
})
export class AppModule {}
