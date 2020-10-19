import { LoginUserDto } from './../../dto/user/login-user.dto';
import { AuthService, IAccessToken } from './../../services/auth/auth.service';
import { ApiConsumes, ApiProperty, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseFilters,
  UseGuards,
} from '@nestjs/common';

import { User } from '@entities/user/user.entity';
import { UsersService } from '@services/users/users.service';
import { RegisterUserDto } from '@dto/user/register-user.dto';

import { ValidationErrorFilter } from '@filters/validation-error/validation-error.filter';
import { MongoErrorFilter } from '@filters/mongo-error/mongo-error.filter';
import { CastErrorFilter } from '@filters/cast-error/cast-error.filter';

import { LocalAuthGuard } from './../../guard/local-auth.guard';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';

@ApiTags('auth')
@Controller('api/v1/auth')
@UseFilters(ValidationErrorFilter, CastErrorFilter, MongoErrorFilter)
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/register')
  async register(
    @Body() body: RegisterUserDto,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.create(body);
    const token = this.authService.getUserToken(user._id);
    return { access_token: token };
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(
    @Body() body: LoginUserDto,
    @Request() req: { user: User },
  ): Promise<IAccessToken> {
    return this.authService.login(req.user);
  }

  // Sample JWT
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: any): any {
    return req.user;
  }
}
