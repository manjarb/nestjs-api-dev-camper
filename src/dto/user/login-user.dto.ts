import { UserFields } from '@entities/user/user.entity';
import { IsString } from 'class-validator';

export class LoginUserDto {
  @IsString()
  readonly [UserFields.Email]: string;

  @IsString()
  readonly [UserFields.Password]: string;
}
