import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Bootcamp } from '@entities/bootcamp/bootcamp.entity';
import { BootcampsService } from '@services/bootcamps/bootcamps.service';
import { mockBootcamps } from '../data/bootcamps';
import { mockCourses } from '../data/courses';
import { Course } from '@entities/course/course.entity';

@Injectable()
export class SeederService {
  constructor(
    @InjectModel(Bootcamp.name) private readonly bootcampModel: Model<Bootcamp>,
    @InjectModel(Course.name) private readonly courseModel: Model<Course>,
    private readonly logger: Logger,
  ) {}

  async seed(): Promise<void> {
    try {
      await this.seedBootcamps();
      await this.seedCourse();
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async delete(): Promise<void> {
    try {
      await this.deleteBootcamps();
      await this.deleteCourses();
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  // Start Bootcamp
  async seedBootcamps(): Promise<void> {
    try {
      for (const b of mockBootcamps) {
        const bootcamp = new this.bootcampModel(b);
        await bootcamp.save();

        this.logger.debug(`Created Bootcamp id: `, bootcamp._id);
      }
      this.logger.debug('Success Seed Bootcamps');
    } catch (error) {
      this.logger.error('Bootcamp seed error: ', error);
      throw error;
    }
  }

  async deleteBootcamps(): Promise<void> {
    try {
      await this.bootcampModel.deleteMany({});
      this.logger.debug('Success Delete Bootcamps');
    } catch (error) {
      this.logger.error('Delete Bootcamp error: ', error);
      throw error;
    }
  }
  // End Bootcamp

  // Start Course
  async seedCourse(): Promise<void> {
    try {
      for (const c of mockCourses) {
        const course = new this.courseModel(c);
        await course.save();

        this.logger.debug(`Created Course id: `, course._id);
      }
    } catch (error) {
      this.logger.error('Course seed error: ', error);
      throw error;
    }
  }

  async deleteCourses(): Promise<void> {
    try {
      await this.courseModel.deleteMany({});
      this.logger.debug('Success Delete Courses');
    } catch (error) {
      this.logger.error('Delete Courses error: ', error);
      throw error;
    }
  }
  // End Course
}
