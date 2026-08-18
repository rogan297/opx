import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductionOrderDto } from './dto/create-production-order.dto';
import { UpdateProductionOrderDto } from './dto/update-production-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductionStatus } from '@prisma/client';

@Injectable()
export class ProductionOrderService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateProductionOrderDto) {
    // 1. Buscamos el workflow y su primer paso
    const workflow = await this.prisma.workflow.findUnique({
      where: { id: dto.workflowId },
      include: { 
        steps: { 
          orderBy: { createdAt: 'asc' }, // Si no añadiste 'order', usamos la fecha de creación
          take: 1 
        } 
      },
    });

    if (!workflow) throw new NotFoundException('Workflow no encontrado');

    const firstStep = workflow.steps[0];
    const status: ProductionStatus = firstStep ? 'IN_PROGRESS' : 'PENDING';

    const orderItem = await this.prisma.orderItem.findUnique({
      where: { id: dto.orderItemId },
      include: { order: true },
    });
    if (!orderItem) throw new NotFoundException('OrderItem not found');

    return this.prisma.productionOrder.create({
      data: {
        orderItem: { connect: { id: dto.orderItemId } },
        tenantId: orderItem.order.tenantId,
        status,
        startedAt: firstStep ? new Date() : undefined,
      },
      include: { 
        orderItem: true 
      },
    });
  }

  async advanceStep(id: string) {
    // 2. Buscamos la orden con sus relaciones (usamos casting 'as any' para simplificar el acceso a pasos)
    const po = await this.prisma.productionOrder.findUnique({
      where: { id }
    }) as any; 

    if (!po || !po.currentStep) return po;

    // 3. Lógica para encontrar el siguiente paso
    // Si usas nextStepId en tu esquema, lo buscamos así:
    const nextStep = po.workflow.steps.find((s: any) => 
      po.currentStep.nextStepId === s.id
    );

    if (!nextStep) {
      // No hay más pasos: La orden está lista para entrega
      return this.prisma.productionOrder.update({
        where: { id },
        data: { 
          status: 'READY', 
          finishedAt: new Date()
        }
      });
    }

    // 4. Actualizamos al siguiente paso
    return this.prisma.productionOrder.update({
      where: { id },
      data: {
        status: "READY"
      }
    });
  }

  findAll() {
    return this.prisma.productionOrder.findMany({
      include: {
        orderItem: true 
      },
    });
  }

  findOne(id: string) {
    return this.prisma.productionOrder.findUnique({
      where: { id },
      include: {
        orderItem: true 
      },
    });
  }

  complete(id: string) {
    return this.prisma.productionOrder.update({
      where: { id },
      data: { 
        status: 'COMPLETED', 
        finishedAt: new Date(), 
      }});
  }

  update(id: string, dto: UpdateProductionOrderDto) {
    const data: any = {};
    
    // Mapeo manual para evitar errores de tipos en el objeto data
    if (dto.workflowId) data.workflow = { connect: { id: dto.workflowId } };
    if (dto.currentStepId) data.currentStep = { connect: { id: dto.currentStepId } };
    // orderItemId es directo en el modelo ProductionOrder
    if (dto.orderItemId) data.orderItemId = dto.orderItemId;

    return this.prisma.productionOrder.update({
      where: { id },
      data});
  }

  remove(id: string) {
    return this.prisma.productionOrder.delete({ where: { id } });
  }
}