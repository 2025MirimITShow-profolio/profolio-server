import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AiFeedbacks, AiFeedbacksDocument } from './ai_feedbacks.schema';
import * as moment from 'moment-timezone';

@Injectable()
export class AiFeedbacksService {
    constructor(@InjectModel(AiFeedbacks.name) private aifeedbacksModel: Model<AiFeedbacksDocument>){}

    // 최초 채팅 전송
    async createAiFeedbacks(
        project_id: string
    ): Promise<AiFeedbacks | void> {
        // 한국 시간
        const kstNow = moment().tz('Asia/Seoul').toDate();

        const firstChat = new this.aifeedbacksModel({
            project_id,
            messages: [{ chat: "안녕" }],
            created_at: kstNow,
            updated_at: kstNow
        });

        return firstChat.save();
    }

    // 채팅 조회
    async getAiFeedbacks(project_id: string): Promise<object | null> {
        return this.aifeedbacksModel.findOne({project_id}).select('messages').exec();
    }

    // 채팅 전송 
    async updateAiFeedbacks(project_id: string, chat: string): Promise<object | null> {
        const kstNow = moment().tz('Asia/Seoul').toDate(); 
        
        await this.aifeedbacksModel.updateOne(
            { project_id }, 
            {
                $push: { messages: { chat } }, 
                $set: { updated_at: kstNow }  
            }
        ).exec();

        return this.aifeedbacksModel.findOne({ project_id }).exec();
    }

    // 채팅 삭제(임시)
    async deleteAiFeedbacks(project_id: string) {
        this.aifeedbacksModel.findOneAndDelete({project_id}).exec();
    }
    
}
