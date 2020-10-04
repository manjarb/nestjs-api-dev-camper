import { Module } from '@nestjs/common';
import { BootcampsController } from './bootcamps.controller';

@Module({
  controllers: [BootcampsController],
})
export class BootcampsModule {}
