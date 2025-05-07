import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skills } from './skills.entity';
import { CreateSkillsDto } from './create-skills.dto';

@Injectable()
export class SkillsService {
    constructor(@InjectRepository(Skills) private readonly skillsRepository: Repository<Skills>){}

    // 스킬 추가
    async createSkill(createSkillsDto: CreateSkillsDto): Promise<Skills> {
        const skill = this.skillsRepository.create(createSkillsDto);
        return this.skillsRepository.save(skill);
    }

    // 스킬 전체 조회
    async getSkills(): Promise<String[]> {
        const skills = await this.skillsRepository.find({ select: ['name'] });
        return skills.map(skill => skill.name);
    }

    // 스킬 수정
    async updateSkillName(name: string, newName: string): Promise<Skills> {
        const skill = await this.skillsRepository.findOne({ where: { name: name } });
    
        if (!skill) {
            throw new NotFoundException(`Skill with name "${name}" not found`);
        }
    
        skill.name = newName;
        return await this.skillsRepository.save(skill);
    }

    async addProjectToSkill(skillName: string, projectName: string): Promise<Skills> {
        const skill = await this.skillsRepository.findOne({ where: { name: skillName } });

        if (!skill) {
          throw new NotFoundException(`Skill with name "${skillName}" not found`);
        }

        if (!skill.project_id.includes(projectName)) {
          skill.project_id.push(projectName);
          return await this.skillsRepository.save(skill);
        }

        return skill; 
    }

    async removeProjectFromSkill(skillName: string, projectName: string): Promise<Skills> {
        const skill = await this.skillsRepository.findOne({ where: { name: skillName } });
    
        if (!skill) {
            throw new NotFoundException(`Skill with name "${skillName}" not found`);
        }
    
        if (!skill.project_id.includes(projectName)) {
            throw new NotFoundException(`Project "${projectName}" not found in skill "${skillName}"`);
        }
    
        skill.project_id = skill.project_id.filter(project => project !== projectName);
    
        return await this.skillsRepository.save(skill);
    }

    // 스킬 삭제
    async deleteSkill(name: string): Promise<void> {
        const result = await this.skillsRepository.delete({ name });
          
        if (result.affected === 0) {
            throw new NotFoundException(`Skill with name "${name}" not found`);
        }
    }
}