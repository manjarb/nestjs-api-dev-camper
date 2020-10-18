import { Module } from '@nestjs/common';

import { AuthService } from './../services/auth/auth.service';
import { AuthController } from './../controllers/auth/auth.controller';
import { MongoProviderModule } from './mongo-provider.module';

@Module({
  imports: [MongoProviderModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
