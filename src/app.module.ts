import { CoursesModule } from './modules/courses.module';
import { AdvancedQueryService } from './services/advanced-query/advanced-query.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BootcampsModule } from './modules/bootcamps.module';

const mongoUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.MONGO_URL
    : 'mongodb://localhost:27017';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`${mongoUrl}/dev-camper`, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    }),
    BootcampsModule,
    CoursesModule,
  ],
  controllers: [AppController],
  providers: [AdvancedQueryService, AppService],
})
export class AppModule {}
