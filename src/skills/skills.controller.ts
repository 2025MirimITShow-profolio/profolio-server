import { Controller, Post, Get, Patch, Delete, Param, Body } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { CreateSkillsDto } from './create-skills.dto';
import { Skills } from './skills.entity';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  // 스킬 추가 API
  @Post()
  async createSkill(
    @Body() createSkills : CreateSkillsDto
  ){
    return this.skillsService.createSkill(createSkills);
  }

  // 스킬 전체 조회 API
  @Get()
  async getSkills(): Promise<String[]> {
    return this.skillsService.getSkills();
  }
  
  // 스킬 수정 API
  @Patch(':name/:newName')
  async updateSkillName(
    @Param('name') name: string,
    @Param('newName') newName: string
  ): Promise<Skills> {
    return this.skillsService.updateSkillName(name, newName);
  }

  @Patch('add/:skillName/:projectName')
  async addProjectToSkill(
    @Param('skillName') skillName: string,
    @Param('projectName') projectName: string,
  ) {
    return this.skillsService.addProjectToSkill(skillName, projectName);
  }
  
  @Patch('remove/:skillName/:projectName')
  async removeProjectFromSkill(
    @Param('skillName') skillName: string,
    @Param('projectName') projectName: string,
  ) {
    return this.skillsService.removeProjectFromSkill(skillName, projectName);
  }

  // 스킬 삭제 API
  @Delete(':name')
  async deleteSkill(@Param('name') name: string): Promise<void> {
    return this.skillsService.deleteSkill(name);
  }
}