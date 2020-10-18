import { MongoProviderModule } from './mongo-provider.module';
import { UsersService } from './../services/users/users.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [MongoProviderModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
