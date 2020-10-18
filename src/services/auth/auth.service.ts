import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '@entities/user/user.entity';
import { UsersService } from './../users/users.service';

export interface IAccessToken {
  access_token: string;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    console.log('validateUser');
    const user = await this.usersService.findByEmail(email);

    // Check if password matches
    const isMatch = await this.usersService.matchPassword(
      password,
      user.password,
    );

    if (!isMatch) {
      return null;
    }

    delete user.password;
    return user;
  }

  async login(user: User): Promise<IAccessToken> {
    const payload = { email: user.email, id: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
