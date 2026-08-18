import { PartialType } from '@nestjs/swagger';
import { CreateWorkflowStepDto } from './create-workflowstep.dto';

export class UpdateWorkflowstepDto extends PartialType(CreateWorkflowStepDto) {}
