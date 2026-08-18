import { Injectable } from '@nestjs/common';
import { CreateStationQueueDto } from './dto/create-station-queue.dto';
import { UpdateStationQueueDto } from './dto/update-station-queue.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StationQueueService {
  constructor(private prisma: PrismaService) {}

  enter(dto: CreateStationQueueDto) {
    return this.prisma.stationQueue.create({
      data: {
        station: { connect: { id: dto.stationId } },
        productionOrder: { connect: { id: dto.productionOrderId } },
      },
      include: { station: true, productionOrder: true },
    });
  }

  exit(id: string) {
    return this.prisma.stationQueue.update({
      where: { id },
      data: { exitedAt: new Date() },
      include: { station: true, productionOrder: true },
    });
  }

  findAll() {
    return this.prisma.stationQueue.findMany({
      include: { station: true, productionOrder: true },
    });
  }

  findOne(id: string) {
    return this.prisma.stationQueue.findUnique({
      where: { id },
      include: { station: true, productionOrder: true },
    });
  }

  update(id: string, dto: UpdateStationQueueDto) {
    return this.prisma.stationQueue.update({
      where: { id },
      data: {
        station: dto.stationId ? { connect: { id: dto.stationId } } : undefined,
        productionOrder: dto.productionOrderId ? { connect: { id: dto.productionOrderId } } : undefined,
      },
    });
  }

  remove(id: string) {
    return this.prisma.stationQueue.delete({ where: { id } });
  }
}
