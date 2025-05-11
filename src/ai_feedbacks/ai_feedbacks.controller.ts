import { Controller, Post, Get, Patch, Body, Param } from '@nestjs/common';
import { AiFeedbacksService } from './ai_feedbacks.service';

@Controller('ai-feedbacks')
export class AiFeedbacksController {
  constructor(private readonly aiFeedbacksService: AiFeedbacksService) {}

  @Post('/:projectId')
  async createChat(
    @Param('projectId') projectId: string,
    @Body('prompt') prompt: string
  ) {
    const result = await this.aiFeedbacksService.createChat(prompt, projectId);
    return {
      message: '성공',
      result,
    };
  }

  @Get('/:projectId')
  async getChat(
    @Param('projectId') projectId: string
  ) {
    const result = await this.aiFeedbacksService.getChat(projectId);
    return {
      message: '성공',
      result
    }
  }
}
