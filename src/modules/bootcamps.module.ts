import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { BootcampsService } from '@services/bootcamps/bootcamps.service';
import { Bootcamp, BootcampSchema } from '@entities/bootcamp/bootcamp.entity';
import { BootcampsController } from '@controllers/bootcamps/bootcamps.controller';
import { AdvancedQueryService } from '@services/advanced-query/advanced-query.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Bootcamp.name,
        schema: BootcampSchema,
      },
    ]),
    ConfigModule,
  ],
  controllers: [BootcampsController],
  providers: [BootcampsService, AdvancedQueryService],
})
export class BootcampsModule {}
