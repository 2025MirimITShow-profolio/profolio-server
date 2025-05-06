import { Injectable } from '@nestjs/common';
import { Portfolio } from './entity/portfolio.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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


}
