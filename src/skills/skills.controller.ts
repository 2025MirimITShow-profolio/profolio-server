import { Controller, Post, Get, Patch, Delete, Param, Body } from '@nestjs/common';
import { SkillsService } from './skills.service';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  // 스킬 추가 API
  @Post()
  addSkill(){
    return this.skillsService.addSkill();
  }

  // 스킬 전체 조회 API
  @Get()
  getSkills(){
    return this.skillsService.getSkills();
  }
  
  // 스킬 수정 API
  @Patch(':skill_id:')
  updateSkill(
    @Param('skill_id') skill_id: string,
    @Body('new_skill') new_skill: string
  ) {
    return this.skillsService.updateSkill(skill_id, new_skill);
  }

  // 스킬 삭제 API
  @Delete(':skill_id')
  deleteSkill(
    @Param('skill_id') skill_id: string
  ) {
    this.skillsService.deleteSkill(skill_id);
  }
}
