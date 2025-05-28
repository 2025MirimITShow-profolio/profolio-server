import { Injectable } from '@nestjs/common';
import { Portfolio } from './entity/portfolio.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(Portfolio)
    private portfolioRepository: Repository<Portfolio>
  ) {}

  async uploadPortfolio(
    file: Express.Multer.File,
    projectId: number
  ): Promise<Portfolio>{

    const portfolio = this.portfolioRepository.create({
      project_id: projectId,
      pdf_url: `/uploads/pdfs/${file.filename}`,
    });

    return this.portfolioRepository.save(portfolio);
  }

  async deletePortfolio(
    projectId: number
  ){
    const portfolio = await this.portfolioRepository.findOneBy({id:projectId});
    
    const filePath = path.join(__dirname, '..', '..', 'uploads', 'pdfs', path.basename(portfolio.pdf_url));
        // path.basename(portfolio.pdf_url) : 파일명만 추출
    if(fs.existsSync(filePath)){  // 파일이 있는지 확인
      await fs.unlink(filePath, (err)=>{ // 파일 삭제
        if(err){
          console.error(err);
          return;
        }
      });
    }

    await this.portfolioRepository.remove(portfolio);
  }

}
