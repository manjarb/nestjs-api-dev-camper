import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CourseAdvancedRequestQueryDto } from '@dto/advanced-query.dto';
import { CreateCourseDto } from '@dto/course/create-course.dto';

import {
  AdvancedQueryService,
  IAdvancedData,
} from '@services/advanced-query/advanced-query.service';
import { BootcampsService } from '@services/bootcamps/bootcamps.service';
import { IPopulatePath } from '@services/advanced-query/advanced-query.service';

import { Course } from '@entities/course/course.entity';
import { BootcampPopulate } from '@entities/bootcamp/bootcamp.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private readonly courseModel: Model<Course>,
    private advancedQueryService: AdvancedQueryService,
    private bootcampsService: BootcampsService,
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

  async findOne(id: string): Promise<Course> {
    const course = await this.courseModel
      .findOne({ _id: id })
      .populate(BootcampPopulate);
    if (!course) {
      throw new NotFoundException(`Course #${id} not found`);
    }
    return course;
  }

  async create(
    bootcampId: string,
    createCourse: CreateCourseDto,
  ): Promise<Course> {
    const bootcamp = await this.bootcampsService.findOne(bootcampId);
    const course = new this.courseModel({
      ...createCourse,
      bootcamp: bootcamp._id,
    });
    return (await course.save()).populate(BootcampPopulate).execPopulate();
  }
}
