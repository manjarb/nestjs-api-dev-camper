import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CoursesController } from '@controllers/courses/courses.controller';
import { CoursesService } from '@services/courses/courses.service';
import { AdvancedQueryService } from '@services/advanced-query/advanced-query.service';
import { BootcampsService } from '@services/bootcamps/bootcamps.service';

import { MongoProviderModule } from './mongo-provider.module';

@Module({
  imports: [MongoProviderModule, ConfigModule],
  controllers: [CoursesController],
  providers: [AdvancedQueryService, CoursesService, BootcampsService],
})
export class CoursesModule {}
