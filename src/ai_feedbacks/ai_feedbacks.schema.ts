import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AiFeedbacksDocument = HydratedDocument<AiFeedbacks>;

@Schema()
export class AiFeedbacks {
    @Prop({required: true})
    project_id: string;

    @Prop()
    messages: Array<object>;

    @Prop()
    created_at: Date;

    @Prop()
    updated_at: Date;
}

export const AiFeedbacksSchema = SchemaFactory.createForClass(AiFeedbacks);