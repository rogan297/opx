import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WorkflowstepService } from './workflowstep.service';
import { CreateWorkflowStepDto } from './dto/create-workflowstep.dto';
import { UpdateWorkflowstepDto } from './dto/update-workflowstep.dto';

@Controller('workflowstep')
export class WorkflowstepController {
  constructor(private readonly workflowstepService: WorkflowstepService) {}

  @Post()
  create(@Body() createWorkflowstepDto: CreateWorkflowStepDto) {
    return this.workflowstepService.create(createWorkflowstepDto);
  }

  @Get()
  findAll() {
    return this.workflowstepService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workflowstepService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkflowstepDto: UpdateWorkflowstepDto) {
    return this.workflowstepService.update(+id, updateWorkflowstepDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workflowstepService.remove(+id);
  }
}
