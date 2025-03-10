import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true, versionKey: false, })
export class User {

  @Prop()
  profile_image?: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  job: string;

  @Prop({ required: true })
  birth_date: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);