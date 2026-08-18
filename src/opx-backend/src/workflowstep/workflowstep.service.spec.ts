import { Test, TestingModule } from '@nestjs/testing';
import { WorkflowstepService } from './workflowstep.service';

describe('WorkflowstepService', () => {
  let service: WorkflowstepService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkflowstepService],
    }).compile();

    service = module.get<WorkflowstepService>(WorkflowstepService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
