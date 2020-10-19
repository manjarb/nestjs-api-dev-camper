import { ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  UseFilters,
  UseGuards,
} from '@nestjs/common';

import { CoursesService } from '@services/courses/courses.service';
import { IAdvancedData } from '@services/advanced-query/advanced-query.service';

import { CourseAdvancedRequestQueryDto } from '@dto/advanced-query.dto';
import { UpdateCourseDto } from '@dto/course/update-course.dto';

import { Course } from '@entities/course/course.entity';
import { BootcampPopulate } from '@entities/bootcamp/bootcamp.entity';
import { UserRoles } from '@entities/user/user.entity';

import { ValidationErrorFilter } from '@filters/validation-error/validation-error.filter';
import { CastErrorFilter } from '@filters/cast-error/cast-error.filter';
import { MongoErrorFilter } from '@filters/mongo-error/mongo-error.filter';

import { RoleAuthGuard } from '@guard/role-auth.guard';
import { JwtAuthGuard } from '@guard/jwt-auth.guard';

import { Roles } from '@decorators/roles.decorator';

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

  @Patch(':id')
  @Roles(UserRoles.Admin, UserRoles.Publisher)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  update(
    @Param('id') id: string,
    @Body() body: UpdateCourseDto,
  ): Promise<Course> {
    return this.coursesService.update(id, body);
  }

  @Delete(':id')
  @Roles(UserRoles.Admin, UserRoles.Publisher)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  remove(@Param('id') id: string): Promise<Course> {
    return this.coursesService.remove(id);
  }
}
