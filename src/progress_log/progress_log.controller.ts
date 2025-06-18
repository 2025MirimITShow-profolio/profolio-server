import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  UploadedFiles,
  UseInterceptors,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ProgressLogService } from './progress_log.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateProgressDto } from './create-progress.dto';
import { link } from 'fs';

@Controller('api/progress-log')
export class ProgressLogController {
  constructor(private readonly progressLogService: ProgressLogService) {}

  // post 진행과정 생성
  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async createProgress(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: CreateProgressDto,
  ) {
    const { projectId, title, links, content } = body;
    try {
      const progress_log = await this.progressLogService.createProgress(
        files,
        projectId,
        title,
        links,
        content,
      );
      return {
        message: '저장 성공',
        progress_log,
      };
    } catch (error) {
      throw {
        message: '저장 실패',
        error: error.message,
      };
    }
  }

  // get 진행과정 조회
  @Get('/:progress_id')
  async getProgress(@Param('progress_id') progress_id: number) {
    try {
      const progress = await this.progressLogService.getProgress(progress_id);
      if (!progress) {
        throw new NotFoundException('해당 progress가 없습니다.');
      }
      return {
        status: '조회 성공',
        progress,
      };
    } catch (error) {
      throw {
        message: '조회 실패',
        error: error.message,
      };
    }
  }

  // get 진행과정 전체 조회
  @Get()
  async getAllProgress() {
    try {
      const progressLogs = await this.progressLogService.getAllProgress();
      return {
        status: '조회 성공',
        progressLogs,
      };
    } catch (error) {
      throw {
        message: '조회 실패',
        error: error.message,
      };
    }
  }

  // 프로젝트별 진행과정 조회
  @Get('project/:project_id')
  async getProgressByProjectId(@Param('project_id') project_id: string) {
    return this.progressLogService.getProgressByProjectId(project_id);
  }

  // patch 진행과정 수정

  // delete 진행과정 삭제
  @Delete('/:progress_id')
  async deleteProgress(@Param('progress_id') progress_id: number) {
    try {
      await this.progressLogService.deleteProgress(progress_id);
      return {
        status: '삭제 성공',
      };
    } catch (error) {
      throw {
        message: '삭제 실패',
        error: error.message,
      };
    }
  }
}
