import { Test, TestingModule } from '@nestjs/testing';
import { WorkflowstepController } from './workflowstep.controller';
import { WorkflowstepService } from './workflowstep.service';

describe('WorkflowstepController', () => {
  let controller: WorkflowstepController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkflowstepController],
      providers: [WorkflowstepService],
    }).compile();

    controller = module.get<WorkflowstepController>(WorkflowstepController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
