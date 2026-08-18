import { Injectable } from '@nestjs/common';
import { CreateWorkflowStepDto } from './dto/create-workflowstep.dto';
import { UpdateWorkflowstepDto } from './dto/update-workflowstep.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WorkflowstepService {
  
  constructor(private prisma : PrismaService){}

  create(createWorkflowstepDto: CreateWorkflowStepDto) {
    return this.prisma.workflowStep.create({
      data: createWorkflowstepDto as any
    });
  }

  findAll() {
    return this.prisma.workflowStep.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} workflowstep`;
  }

  update(id: number, updateWorkflowstepDto: UpdateWorkflowstepDto) {
    return `This action updates a #${id} workflowstep`;
  }

  remove(id: number) {
    return `This action removes a #${id} workflowstep`;
  }
}
