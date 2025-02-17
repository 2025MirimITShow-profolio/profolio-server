import { Controller } from '@nestjs/common';
import { AiFeedbacksService } from './ai_feedbacks.service';

@Controller('ai-feedbacks')
export class AiFeedbacksController {
  constructor(private readonly aiFeedbacksService: AiFeedbacksService) {}
}
