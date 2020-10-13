import { Bootcamp } from '@entities/bootcamp/bootcamp.entity';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema } from 'mongoose';

export enum MinimumSkill {
  Beginner = 'beginner',
  Intermediate = 'intermediate',
  Advanced = 'advanced',
}

@Schema()
export class Course extends Document {
  @Prop({
    type: String,
    trim: true,
    required: [true, 'Please add a course title'],
  })
  title: string;

  @Prop({
    type: String,
    required: [true, 'Please add a description'],
  })
  description: string;

  @Prop({
    type: String,
    required: [true, 'Please add number of weeks'],
  })
  weeks: string;

  @Prop({
    type: Number,
    required: [true, 'Please add a tuition cost'],
  })
  tuition: number;

  @Prop({
    type: String,
    required: [true, 'Please add a minimum skill'],
    enum: [
      MinimumSkill.Beginner,
      MinimumSkill.Intermediate,
      MinimumSkill.Advanced,
    ],
  })
  minimumSkill: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  scholarhipsAvailable: boolean;

  @Prop({
    type: Date,
    default: Date.now,
  })
  createdAt: Date;

  @Prop({
    type: mongooseSchema.Types.ObjectId,
    ref: 'Bootcamp',
    required: true,
  })
  bootcamp: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
