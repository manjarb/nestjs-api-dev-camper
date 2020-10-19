import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { JwtStrategy } from './../strategy/jwt.strategy';
import { jwtConstants } from './../constants/auth.constant';
import { UsersModule } from './users.module';
import { LocalStrategy } from './../strategy/local.strategy';
import { AuthService } from './../services/auth/auth.service';
import { AuthController } from './../controllers/auth/auth.controller';
import { MongoProviderModule } from './mongo-provider.module';

@Module({
  imports: [
    MongoProviderModule,
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: process.env.JWT_EXPIRE },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}