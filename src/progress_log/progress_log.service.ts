import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Progress_log } from './progress_log.entity';
import { marked } from 'marked';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProgressLogService {
  constructor(
    @InjectRepository(Progress_log)
    private readonly ProgressRepository: Repository<Progress_log>
  ){}

  // 마크다운으로 변환
  async convertMarkdownToHtml(markdown: string): Promise<string> {
    return await marked(markdown);
  }

  private s3Client = new S3Client({
    region: 'ap-northeast-2',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  // 버킷에 이미지 저장
  async uploadImage(imageBuffer: Buffer, fileName: string, projectId: string) {
    const uniqueFileName = uuidv4() + '-' + fileName;
    const contentType = fileName.endsWith('.png') ? 'image/png' : 'image/jpeg';

    const uploadParams = {
      Bucket: 'profolio2025',
      Key: `${projectId}/${uniqueFileName}`,
      Body: imageBuffer,
      ContentType: contentType,
    };

    try {
      const command = new PutObjectCommand(uploadParams);
      const response = await this.s3Client.send(command);
      
      const imageUrl = `https://profolio2025.s3.ap-northeast-2.amazonaws.com/${projectId}/${uniqueFileName}`;
      return imageUrl;
    } catch (error) {
      throw new Error('S3 업로드 실패: ' + error.message);
    }
  }

  // 진행과정 생성
  async createProgress(files: Express.Multer.File[], projectId: string, title: string, links: string[] = [], content: string = ''){
    const imageUrls: string[] = [];

    for (const file of files) {
      const imageUrl = await this.uploadImage(file.buffer, file.originalname, projectId);
      imageUrls.push(imageUrl);
    }
    
    const progress =  this.ProgressRepository.create({
      projectId, 
      title,
      links,
      content: await this.convertMarkdownToHtml(content),
      images: imageUrls,
    } as Partial<Progress_log>);

    return await this.ProgressRepository.save(progress);
  }

  // 진행과정 조회
  async getProgress(progress_id: number): Promise<Progress_log | null> {
    return this.ProgressRepository.findOne({ where: { id: progress_id } });
  }

  // 진행과정 전체 조회
  async getAllProgress(): Promise<Progress_log[]> {
    return this.ProgressRepository.find();
  }

  // 진행과정 삭제
  async deleteProgress(progress_id: number) {
    return this.ProgressRepository.delete({ id: progress_id });
  }
}