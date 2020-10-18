import { compare } from 'bcryptjs';
import { RegisterUserDto } from './../../dto/user/register-user.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from '@entities/user/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    // +password to include password on the result bec we set select: false In User's entity
    const user = await this.userModel.findOne({ email }).select('+password');

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  create(createUser: RegisterUserDto): Promise<User> {
    const user = new this.userModel(createUser);
    return user.save();
  }

  async matchPassword(
    enteredPassword: string,
    userPassword: string,
  ): Promise<boolean> {
    return await compare(enteredPassword, userPassword);
  }
}
