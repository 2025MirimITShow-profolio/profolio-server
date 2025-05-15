import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AiFeedback } from './ai_feedbacks.entity';
import { HttpModule } from '@nestjs/axios';
import { AiFeedbacksService } from './ai_feedbacks.service';
import { AiFeedbacksController } from './ai_feedbacks.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AiFeedback]), HttpModule],
  controllers: [AiFeedbacksController],
  providers: [AiFeedbacksService],
})
export class AiFeedbacksModule {}
