import { IsBoolean, IsNumber, IsString } from 'class-validator';

import { MinimumSkill } from '@entities/course/course.entity';

export class CreateCourseDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly weeks: string;

  @IsNumber()
  readonly tuition: number;

  @IsString()
  readonly minimumSkill: MinimumSkill;

  @IsBoolean()
  readonly scholarhipsAvailable: boolean;
}
