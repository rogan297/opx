import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  
  imports: [PrismaModule, ClientsModule.register([
      {
        name: 'RABBIT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'inventory_queue',
          queueOptions: { durable: true },
        },
      },
    ])],
  controllers: [InventoryController],
  providers: [InventoryService],
})
export class InventoryModule {}
