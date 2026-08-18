import { Injectable } from '@nestjs/common';
import { CreateActionTypeDto } from './dto/create-action-type.dto';
import { UpdateActionTypeDto } from './dto/update-action-type.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ActionTypeService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateActionTypeDto) {
    const { tenantId, ...rest } = dto;
    return this.prisma.actionType.create({
      data: tenantId
        ? { ...rest, tenant: { connect: { id: tenantId } } }
        : { ...rest },
    });
  }

  findAll(tenantId?: string) {
    return this.prisma.actionType.findMany({
      where: tenantId
        ? { OR: [{ tenantId }, { isSystem: true }] }
        : { isSystem: true },
    });
  }

  findOne(id: string) {
    return this.prisma.actionType.findUnique({ where: { id } });
  }

  update(id: string, dto: UpdateActionTypeDto) {
    return this.prisma.actionType.update({ where: { id }, data: dto });
  }

  remove(id: string) {
    return this.prisma.actionType.delete({ where: { id } });
  }
}
