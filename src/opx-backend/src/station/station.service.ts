import { Injectable } from '@nestjs/common';
import { CreateStationDto } from './dto/create-station.dto';
import { UpdateStationDto } from './dto/update-station.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StationService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateStationDto) {
    return this.prisma.station.create({
      data: {
        name: dto.name,
        description: dto.description,
        isActive: dto.isActive ?? true,
        currentLoad: dto.currentLoad ?? 0,
        responsible: dto.responsible,
        tenant: { connect: { id: dto.tenantId } },
      },
    });
  }

  findAll(tenantId?: string) {
    return this.prisma.station.findMany({
      where: tenantId ? { tenantId } : undefined,
      include: { queueItems: true },
    });
  }

  findOne(id: string) {
    return this.prisma.station.findUnique({
      where: { id },
      include: { queueItems: true },
    });
  }

  update(id: string, dto: UpdateStationDto) {
    const data: any = {};
    if (dto.name !== undefined) data.name = dto.name;
    if (dto.description !== undefined) data.description = dto.description;
    if (dto.isActive !== undefined) data.isActive = dto.isActive;
    if (dto.currentLoad !== undefined) data.currentLoad = dto.currentLoad;
    if (dto.responsible !== undefined) data.responsible = dto.responsible;
    if (dto.tenantId !== undefined) data.tenant = { connect: { id: dto.tenantId } };

    return this.prisma.station.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.station.delete({ where: { id } });
  }
}
