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
    type: Number,
    required: [true, 'Please add number of weeks'],
  })
  weeks: number;

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

// Static method to get avg of course tuitions
CourseSchema.statics.getAverageCost = async function(
  bootcampId: string,
): Promise<void> {
  const obj = await this.aggregate([
    {
      $match: { bootcamp: bootcampId },
    },
    {
      $group: {
        _id: '$bootcamp',
        averageCost: { $avg: '$tuition' },
      },
    },
  ]);

  try {
    await this.model(Bootcamp.name).findByIdAndUpdate(bootcampId, {
      averageCost: Math.ceil(obj[0].averageCost / 10) * 10,
    });
  } catch (err) {
    console.error(err);
  }
};

// Call getAverageCost after save
CourseSchema.post('save', function() {
  this.constructor.getAverageCost(this.bootcamp);
});

// Call getAverageCost before remove
CourseSchema.pre('remove', function(this: Course) {
  (this.constructor as any).getAverageCost(this.bootcamp);
});
