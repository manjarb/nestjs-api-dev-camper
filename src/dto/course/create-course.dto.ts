import { IsBoolean, IsNumber, IsString } from 'class-validator';

import { MinimumSkill } from '@entities/course/course.entity';

export class CreateCourseDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsNumber()
  readonly weeks: number;

  @IsNumber()
  readonly tuition: number;

  @IsString()
  readonly minimumSkill: MinimumSkill;

  @IsBoolean()
  readonly scholarhipsAvailable: boolean;
}
