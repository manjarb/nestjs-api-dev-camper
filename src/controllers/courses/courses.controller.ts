import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param, Query, UseFilters } from '@nestjs/common';

import { CoursesService } from '@services/courses/courses.service';
import { IAdvancedData } from '@services/advanced-query/advanced-query.service';
import { CourseAdvancedRequestQueryDto } from '@dto/advanced-query.dto';

import { Course } from '@entities/course/course.entity';
import { BootcampPopulate } from '@entities/bootcamp/bootcamp.entity';

import { ValidationErrorFilter } from '@filters/validation-error/validation-error.filter';
import { CastErrorFilter } from '@filters/cast-error/cast-error.filter';
import { MongoErrorFilter } from '@filters/mongo-error/mongo-error.filter';

@ApiTags('courses')
@Controller('api/v1/courses')
@UseFilters(ValidationErrorFilter, CastErrorFilter, MongoErrorFilter)
export class CoursesController {
  constructor(private coursesService: CoursesService) {}

  @Get()
  findAll(
    @Query() paginationQuery: CourseAdvancedRequestQueryDto,
  ): Promise<IAdvancedData<Course>> {
    return this.coursesService.findAll(paginationQuery, BootcampPopulate);
  }

  @Get(':id')
  findOne(
    @Param('id')
    id: string,
  ): Promise<Course> {
    return this.coursesService.findOne(id);
  }
}
