import { BootcampSchema } from './../../models/bootcamp.model';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Bootcamp } from 'src/models/bootcamp.model';
import { BootcampsController } from './bootcamps.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Bootcamp.name,
        schema: BootcampSchema,
      },
    ]),
  ],
  controllers: [BootcampsController],
})
export class BootcampsModule {}
