import { Injectable } from '@nestjs/common';
import { CreateWorkflowDto } from './dto/create-workflow.dto'
import { UpdateWorkflowDto } from './dto/update-workflow.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WorkflowService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateWorkflowDto) {
    return this.prisma.workflow.create({
      data: {
        name: dto.name,
        description: dto.description,
        isActive: dto.isActive ?? true,
        status: dto.status,
        tenant: { connect: { id: dto.tenantId } },
        dsl: {}
      },
      include: { steps: true },
    });
  }

  findAll(tenantId?: string) {
    return this.prisma.workflow.findMany({
      where: tenantId ? { tenantId } : undefined,
      include: { steps: true },
    });
  }

  findOne(id: string) {
    return this.prisma.workflow.findUnique({
      where: { id },
      include: { steps: true },

    });
  }

  async update(id: string, dto: UpdateWorkflowDto) {
    const { steps, ...workflowData } = dto;

    return this.prisma.$transaction(async (tx) => {
      // 1. Actualizamos la cabecera del workflow
      await tx.workflow.update({
        where: { id },
        data: workflowData,
      });

      if (steps) {
        // 2. Identificamos qué steps fueron eliminados en el Canvas
        const incomingIds = steps.map(s => s.id);
        
        await tx.workflowStep.deleteMany({
          where: {
            workflowId: id,
            id: { notIn: incomingIds }
          }
        });

        // 3. Sincronizamos los steps (Crear nuevos o actualizar existentes)
        // Usamos for...of para asegurar que las operaciones se completen en orden
        for (const step of steps) {
          await tx.workflowStep.upsert({
            where: { id: step.id },
            update: {
              actionTypeId: step.actionTypeId,
              nextStepId: step.nextStepId,
            },
            create: {
              id: step.id,
              workflowId: id,
              category: step.category,
              actionTypeId: step.actionTypeId,
              nextStepId: step.nextStepId,
              config: {},
            },
          });
        }
      }

      return tx.workflow.findUnique({
        where: { id },
        include: { steps: true },
      });
    });
  }

  remove(id: string) {
    return this.prisma.workflow.delete({ where: { id } });
  }

  activate(id: string) {
    return this.prisma.workflow.update({
      where: { id },
      data: { status: 'ACTIVE', isActive: true },
    });
  }

  pause(id: string) {
    return this.prisma.workflow.update({
      where: { id },
      data: { status: 'PAUSED', isActive: false },
    });
  }
}
