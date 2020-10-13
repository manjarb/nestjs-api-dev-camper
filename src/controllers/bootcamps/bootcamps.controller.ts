import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseFilters,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Course } from '@entities/course/course.entity';
import { Bootcamp } from '@entities/bootcamp/bootcamp.entity';

import { ValidationErrorFilter } from '@filters/validation-error/validation-error.filter';
import { MongoErrorFilter } from '@filters/mongo-error/mongo-error.filter';
import { CastErrorFilter } from '@filters/cast-error/cast-error.filter';

import { BootcampsService } from '@services/bootcamps/bootcamps.service';
import { IAdvancedData } from '@services/advanced-query/advanced-query.service';
import { CoursesService } from '@services/courses/courses.service';

import { CreateBootcampDto } from '@dto/bootcamp/create-bootcamp.dto';
import { PaginationQueryDto } from '@dto/pagination-query.dto';
import { UpdateBootcampDto } from '@dto/bootcamp/update-bootcamp.dto';
import { BootcampAdvancedRequestQueryDto } from '@dto/advanced-query.dto';

@ApiTags('bootcamps')
@Controller('api/v1/bootcamps')
@UseFilters(ValidationErrorFilter, CastErrorFilter, MongoErrorFilter)
export class BootcampsController {
  constructor(
    private bootcampsService: BootcampsService,
    private coursesService: CoursesService,
  ) {}

  @Get()
  findAll(
    @Query() paginationQuery: BootcampAdvancedRequestQueryDto,
  ): Promise<IAdvancedData<Bootcamp>> {
    return this.bootcampsService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(
    @Param('id')
    id: string,
  ): Promise<Bootcamp> {
    return this.bootcampsService.findOne(id);
  }

  @Get(':id/courses')
  findCourses(
    @Param('id')
    id: string,
  ): Promise<IAdvancedData<Course>> {
    return this.coursesService.findAll({
      bootcamp: id,
    });
  }

  @Get('radius/:zipcode/:distance')
  findInRadius(
    @Param('zipcode')
    zipcode: string,
    @Param('distance')
    distance: string,
    @Query() paginationQuery: PaginationQueryDto,
  ): Promise<IAdvancedData<Bootcamp>> {
    return this.bootcampsService.findInRadius(
      zipcode,
      parseInt(distance, 10),
      paginationQuery,
    );
  }

  @Post()
  create(@Body() body: CreateBootcampDto): Promise<Bootcamp> {
    return this.bootcampsService.create(body);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: UpdateBootcampDto,
  ): Promise<Bootcamp> {
    return this.bootcampsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Bootcamp> {
    return this.bootcampsService.remove(id);
  }
}
