import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CoursesController } from '@controllers/courses/courses.controller';
import { CoursesService } from '@services/courses/courses.service';
import { AdvancedQueryService } from '@services/advanced-query/advanced-query.service';

import { MongoProviderModule } from './mongo-provider.module';

@Module({
  imports: [MongoProviderModule, ConfigModule],
  controllers: [CoursesController],
  providers: [AdvancedQueryService, CoursesService],
})
export class CoursesModule {}
