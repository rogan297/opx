import { Module } from '@nestjs/common';
import { WorkflowstepService } from './workflowstep.service';
import { WorkflowstepController } from './workflowstep.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [WorkflowstepController],
  providers: [WorkflowstepService],
})
export class WorkflowstepModule {}
