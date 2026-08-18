import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TenantService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateTenantDto) {
    return this.prisma.tenant.create({
      data: {
        name: dto.name,
        sector: dto.sector,
        config: (dto.config as any) ?? {},
      },
    });
  }

  findAll() {
    return this.prisma.tenant.findMany();
  }

  findOne(id: string) {
    return this.prisma.tenant.findUnique({ where: { id } });
  }

  update(id: string, dto: UpdateTenantDto) {
    return this.prisma.tenant.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: string) {
    return this.prisma.tenant.delete({ where: { id } });
  }

  async getConfig(tenantId: string) {
    const tenant = await this.prisma.tenant.findUnique({
      where: { id: tenantId },
    });
    if (!tenant) throw new NotFoundException('Tenant not found');
    return {
      id: tenant.id,
      name: tenant.name,
      sector: tenant.sector,
      config: tenant.config,
    };
  }
}
