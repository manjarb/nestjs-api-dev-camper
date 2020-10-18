import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './modules/auth.module';
import { CoursesModule } from './modules/courses.module';
import { BootcampsModule } from './modules/bootcamps.module';

import { AdvancedQueryService } from './services/advanced-query/advanced-query.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const mongoUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.MONGO_URL
    : 'mongodb://localhost:27017';

@Module({
  imports: [
    MongooseModule.forRoot(`${mongoUrl}/dev-camper`, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    }),
    BootcampsModule,
    CoursesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AdvancedQueryService, AppService],
})
export class AppModule {}
