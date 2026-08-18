// transporter.module.ts
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'BROKER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'], // URL de tu instancia de Rabbit
          queue: 'main_queue',
          queueOptions: { durable: true },
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class TransporterModule {}