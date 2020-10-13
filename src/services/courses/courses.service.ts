import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CourseAdvancedRequestQueryDto } from '@dto/advanced-query.dto';
import {
  AdvancedQueryService,
  IAdvancedData,
} from '@services/advanced-query/advanced-query.service';
import { Course } from '@entities/course/course.entity';

import { IPopulatePath } from '@services/advanced-query/advanced-query.service';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private readonly courseModel: Model<Course>,
    private advancedQueryService: AdvancedQueryService,
  ) {}

  findAll(
    paginationQuery: CourseAdvancedRequestQueryDto,
    populate?: IPopulatePath,
  ): Promise<IAdvancedData<Course>> {
    return this.advancedQueryService.getAdvancedQuery(
      paginationQuery,
      this.courseModel,
      populate,
    );
  }
}
