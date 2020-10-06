import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Bootcamp, BootcampSchema } from '@entities/bootcamp/bootcamp.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Bootcamp.name,
        schema: BootcampSchema,
      },
    ]),
  ],
  exports: [MongooseModule],
})
export class MongoProviderModule {}
