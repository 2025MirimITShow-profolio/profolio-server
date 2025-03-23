import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Skills, SkillsDocument } from './skills.schema';

@Injectable()
export class SkillsService {
    constructor(@InjectModel(Skills.name) private skillsModel: Model<SkillsDocument>){}

    // 스킬 추가
    async addSkill(): Promise<Skills | void> {
        const now = new Date();
        const kt = new Date(now.getTime() + 9 * 60 * 60 * 1000);

        const Skill = new this.skillsModel({
            user_id : "sori",
            project_id: "profolio",
            name: "mongo",
            created_at: kt,
            updated_at: kt
        });

        return Skill.save();
    }

    // 스킬 전체 조회
    async getSkills(): Promise<Array<string> | null> {
        return this.skillsModel.distinct('name').exec();
    }

    // 스킬 수정
    async updateSkill(skill_id: string, new_skill: string) {
        return await this.skillsModel.updateOne(
            { skill_id },
            { $set: { name: new_skill} }
        ).exec();
    }

    // 스킬 삭제
    async deleteSkill(skill_id: string) {
        this.skillsModel.findOneAndDelete({skill_id});
    }
}
