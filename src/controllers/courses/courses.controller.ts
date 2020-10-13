import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';

import { CoursesService } from '@services/courses/courses.service';
import { Course } from '@entities/course/course.entity';
import { CourseAdvancedRequestQueryDto } from '@dto/advanced-query.dto';

import { IAdvancedData } from '@services/advanced-query/advanced-query.service';

@ApiTags('courses')
@Controller('api/v1/courses')
export class CoursesController {
  constructor(private coursesService: CoursesService) {}

  @Get()
  findAll(
    @Query() paginationQuery: CourseAdvancedRequestQueryDto,
  ): Promise<IAdvancedData<Course>> {
    return this.coursesService.findAll(paginationQuery);
  }
}
