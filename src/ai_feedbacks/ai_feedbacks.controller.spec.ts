import { Test, TestingModule } from '@nestjs/testing';
import { AiFeedbacksController } from './ai_feedbacks.controller';
import { AiFeedbacksService } from './ai_feedbacks.service';

describe('AiFeedbacksController', () => {
  let controller: AiFeedbacksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AiFeedbacksController],
      providers: [AiFeedbacksService],
    }).compile();

    controller = module.get<AiFeedbacksController>(AiFeedbacksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
