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
    const { _id } = user;
    return {
      access_token: this.getUserToken(_id),
    };
  }

  getUserToken(id: string): string {
    return this.jwtService.sign({
      id,
    });
  }
}
