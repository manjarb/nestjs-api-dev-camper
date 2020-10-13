import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { BootcampsService } from '@services/bootcamps/bootcamps.service';
import { BootcampsController } from '@controllers/bootcamps/bootcamps.controller';
import { AdvancedQueryService } from '@services/advanced-query/advanced-query.service';
import { CoursesService } from '@services/courses/courses.service';
import { GeocoderService } from '@utils/geocoder.util';
import { MongoProviderModule } from './mongo-provider.module';

@Module({
  imports: [MongoProviderModule, ConfigModule],
  controllers: [BootcampsController],
  providers: [
    BootcampsService,
    AdvancedQueryService,
    GeocoderService,
    CoursesService,
  ],
})
export class BootcampsModule {}
