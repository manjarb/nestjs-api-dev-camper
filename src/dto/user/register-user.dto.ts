import { UserFields } from '@entities/user/user.entity';
import { IsString } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  readonly [UserFields.Name]: string;

  @IsString()
  readonly [UserFields.Email]: string;

  @IsString()
  readonly [UserFields.Password]: string;

  @IsString()
  readonly [UserFields.Role]: string;
}
