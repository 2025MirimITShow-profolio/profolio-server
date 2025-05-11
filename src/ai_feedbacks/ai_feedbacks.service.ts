import { Injectable, BadRequestException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { firstValueFrom } from 'rxjs';
import { AiFeedback, AiMessage } from './ai_feedbacks.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class AiFeedbacksService {
  private readonly API_KEY = process.env.GEMINI_API_KEY;
  private readonly BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(AiFeedback)
    private readonly feedbackRepo: Repository<AiFeedback>
  ) {}

  // 프로젝트가 존재하면 기존 메시지 배열에 새 메시지 추가 아니면 생성
  async createChat(prompt: string, projectId: string): Promise<AiMessage> {
    const url = `${this.BASE_URL}?key=${this.API_KEY}`;
    const body = {
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    };

    const headers = { 'Content-Type': 'application/json' };

    try {
      const response = await firstValueFrom(
        this.httpService.post(url, body, { headers })
      );

      const newMessages = [
        {
          role: 'user' as const,
          content: prompt,
          timestamp: new Date().toISOString(),
        },
        {
          role: 'ai' as const,
          content: response.data?.candidates?.[0]?.content?.parts?.[0]?.text || '',
          timestamp: new Date().toISOString(),
        },
      ];

      let feedback = await this.feedbackRepo.findOne({ where: { projectId: projectId } });

      if (feedback) {
        const updatedMessages = [...feedback.messages, ...newMessages];
        feedback.messages = updatedMessages;
        await this.feedbackRepo.save(feedback);
      } else {
        feedback = this.feedbackRepo.create({
          id: randomUUID(),
          projectId,
          messages: newMessages,
        });
        await this.feedbackRepo.save(feedback);
      }

      return newMessages[1];
    } catch (error) {
      throw new Error(`Gemini API 오류: ${error.response?.data?.error?.message || error.message}`);
    }
  }

  async getChat(projectId: string): Promise<AiMessage[]>{
    const result = await this.feedbackRepo.findOne({ where: { projectId: projectId } });
    if(!result){
      throw new BadRequestException('해당 프로젝트가 존재하지 않음');
    }
    return result.messages;
  }
}
