import { Test, TestingModule } from '@nestjs/testing';
import { StockmovementService } from './stockmovement.service';

describe('StockmovementService', () => {
  let service: StockmovementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StockmovementService],
    }).compile();

    service = module.get<StockmovementService>(StockmovementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
