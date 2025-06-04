import { Body, Controller, Delete, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';
import { extname } from 'path';

@Controller('api/portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('portfolio',
      {
        storage: diskStorage({
          destination: './uploads/pdfs', // 포트폴리오 저장 위치
          filename: (req, file, cb) =>{
            const uniqueNum = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname);// 확장자
            cb(null, file.fieldname + '-' + uniqueNum + ext);
          }
        }),
      })
  )
  async uploadPortfolio(
    @UploadedFile() file: Express.Multer.File,
    @Body('project_id') projectId: number,
){
    return this.portfolioService.uploadPortfolio(file, projectId);
  }

  @Get(':project_id')
  async getPortfolio(@Param('project_id') project_id, @Res() res: Response){
    const filePath = await this.portfolioService.getPortfolio(project_id);

    if (!filePath) {
      return res.status(200).json({
        success: false,
      });
    }
    
    res.sendFile(filePath);
  }

  @Delete(':project_id')
  async deletePortfolio(@Param('project_id') project_id){
    this.portfolioService.deletePortfolio(project_id);
  }
}