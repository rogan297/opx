import { Module } from '@nestjs/common';
import { StationQueueService } from './station-queue.service';
import { StationQueueController } from './station-queue.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [StationQueueController],
  providers: [StationQueueService],
  exports: [StationQueueService],
})
export class StationQueueModule {}
