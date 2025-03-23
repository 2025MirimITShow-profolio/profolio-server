import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SkillsDocument = HydratedDocument<Skills>;

@Schema()
export class Skills {
    @Prop({required: true})
    user_id: string;

    @Prop({required: true})
    project_id: Array<string>;

    @Prop({required: true})
    name: string;

    @Prop()
    created_at: Date;

    @Prop()
    updated_at: Date;
}

export const SkillsSchema = SchemaFactory.createForClass(Skills);