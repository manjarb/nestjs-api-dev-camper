import { Module } from '@nestjs/common';

import { CoursesController } from '@controllers/courses/courses.controller';
import { CoursesService } from '@services/courses/courses.service';
import { AdvancedQueryService } from '@services/advanced-query/advanced-query.service';
import { BootcampsService } from '@services/bootcamps/bootcamps.service';

import { MongoProviderModule } from './mongo-provider.module';

@Module({
  imports: [MongoProviderModule],
  controllers: [CoursesController],
  providers: [AdvancedQueryService, CoursesService, BootcampsService],
})
export class CoursesModule {}
