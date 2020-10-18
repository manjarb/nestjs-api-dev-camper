import { ApiTags } from '@nestjs/swagger';
import { Controller, Post } from '@nestjs/common';

@ApiTags('auth')
@Controller('api/v1/auth')
export class AuthController {
  @Post('/register')
  register(): string {
    return 'ee';
  }
}
