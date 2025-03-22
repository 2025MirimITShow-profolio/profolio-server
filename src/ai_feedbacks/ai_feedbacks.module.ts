import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AiFeedbacksService } from './ai_feedbacks.service';
import { AiFeedbacksController } from './ai_feedbacks.controller';
import { AiFeedbacks, AiFeedbacksSchema } from './ai_feedbacks.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: AiFeedbacks.name, schema: AiFeedbacksSchema}])
  ],
  controllers: [AiFeedbacksController],
  providers: [AiFeedbacksService],
})
export class AiFeedbacksModule {}
