import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';

import { CoursesService } from '@services/courses/courses.service';
import { IAdvancedData } from '@services/advanced-query/advanced-query.service';
import { CourseAdvancedRequestQueryDto } from '@dto/advanced-query.dto';

import { Bootcamp } from '@entities/bootcamp/bootcamp.entity';
import { BootcampFields } from '@entities/bootcamp/bootcamp.entity';
import { Course } from '@entities/course/course.entity';

@ApiTags('courses')
@Controller('api/v1/courses')
export class CoursesController {
  constructor(private coursesService: CoursesService) {}

  @Get()
  findAll(
    @Query() paginationQuery: CourseAdvancedRequestQueryDto,
  ): Promise<IAdvancedData<Course>> {
    return this.coursesService.findAll(paginationQuery, {
      path: Bootcamp.name.toLowerCase(),
      select: `${BootcampFields.Name} ${BootcampFields.Description}`,
    });
  }
}
