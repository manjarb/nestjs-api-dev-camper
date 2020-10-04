import { BootcampsModule } from './controllers/bootcamps/bootcamps.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [BootcampsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
