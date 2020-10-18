import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Bootcamp, BootcampSchema } from '@entities/bootcamp/bootcamp.entity';
import { Course, CourseSchema } from '@entities/course/course.entity';
import { User, UserSchema } from '@entities/user/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Bootcamp.name,
        schema: BootcampSchema,
      },
      {
        name: Course.name,
        schema: CourseSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    MongooseModule.forFeatureAsync([
      {
        name: Bootcamp.name,
        useFactory: (): any => {
          const schema = BootcampSchema;
          Bootcamp.bindVirtualField(schema);
          return schema;
        },
      },
    ]),
  ],
  exports: [MongooseModule],
})
export class MongoProviderModule {}
