import { Injectable } from '@nestjs/common';
import { CreateStandardDto } from './dto/create-standard.dto';
import { UpdateStandardDto } from './dto/update-standard.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StandardService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateStandardDto) {
    return this.prisma.standard.create({ data: dto as any });
  }

  findAll(tenantId?: string) {
    return this.prisma.standard.findMany({
      where: tenantId ? { tenantId } : undefined,
    });
  }

  findOne(id: string) {
    return this.prisma.standard.findUnique({ where: { id } });
  }

  update(id: string, dto: UpdateStandardDto) {
    return this.prisma.standard.update({ where: { id }, data: dto as any });
  }

  remove(id: string) {
    return this.prisma.standard.delete({ where: { id } });
  }
}
