import { Module } from '@nestjs/common';
import { AiFeedbacksService } from './ai_feedbacks.service';
import { AiFeedbacksController } from './ai_feedbacks.controller';

@Module({
  controllers: [AiFeedbacksController],
  providers: [AiFeedbacksService],
})
export class AiFeedbacksModule {}
