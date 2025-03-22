import { Controller, Get, Post, Delete, Patch, Param } from '@nestjs/common';
import { AiFeedbacksService } from './ai_feedbacks.service';

@Controller('ai-feedbacks')
export class AiFeedbacksController {
    constructor(private readonly aiFeedbacksService: AiFeedbacksService) {}

    // 최초 채팅 전송 API
    @Post(':project_id')
    createAiFeedbacks(
        @Param('project_id') project_id: string
    ) {
        return this.aiFeedbacksService.createAiFeedbacks(project_id);
    }

    // 채팅 조회 API
    @Get(':project_id')
    getAiFeedbacks(
        @Param('project_id') project_id: string
    ) {
        return this.aiFeedbacksService.getAiFeedbacks(project_id);
    }

    // 채팅 전송 API
    @Patch(':project_id/:chat')
    updateAiFeedbacks(
        @Param('project_id') project_id: string,
        @Param('chat') chat: string
    ) {
        return this.aiFeedbacksService.updateAiFeedbacks(project_id, chat);
    }

    // 채팅 삭제 API(임시)
    @Delete(':project_id')
    deleteAiFeedbacks(
        @Param('project_id') project_id: string
    ) {
        this.aiFeedbacksService.deleteAiFeedbacks(project_id);
    }
}
