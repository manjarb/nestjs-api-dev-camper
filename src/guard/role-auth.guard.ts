import { UsersService } from '@services/users/users.service';
import { User } from '@entities/user/user.entity';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RoleAuthGuard implements CanActivate {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    console.log(roles, ' :roles');

    const request = context.switchToHttp().getRequest();
    const user = await this.userModel.findById(request.user._id);

    return roles.includes(user.role);
  }
}
