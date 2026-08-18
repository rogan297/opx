import { Test, TestingModule } from '@nestjs/testing';
import { StockmovementController } from './stockmovement.controller';
import { StockmovementService } from './stockmovement.service';

describe('StockmovementController', () => {
  let controller: StockmovementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockmovementController],
      providers: [StockmovementService],
    }).compile();

    controller = module.get<StockmovementController>(StockmovementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
