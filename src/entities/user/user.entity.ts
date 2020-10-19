import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema } from 'mongoose';
import { compare, genSalt, hash } from 'bcryptjs';

export enum UserFields {
  Name = 'name',
  Email = 'email',
  Role = 'role',
  Password = 'password',
  ResetPasswordToken = 'resetPasswordToken',
  ResetPasswordExpire = 'resetPasswordExpire',
  CreatedAt = 'createdAt',
}

export enum UserRoles {
  Admin = 'admin',
  User = 'user',
  Publisher = 'publisher',
}

@Schema()
export class User extends Document {
  @Prop({
    type: String,
    required: [true, 'Please add a name'],
  })
  [UserFields.Name]: string;

  @Prop({
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  })
  [UserFields.Email]: string;

  @Prop({
    type: String,
    enum: ['user', 'publisher'],
    default: 'user',
  })
  [UserFields.Role]: string;

  @Prop({
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false,
  })
  [UserFields.Password]?: string;

  @Prop({
    type: String,
  })
  [UserFields.ResetPasswordToken]: string;

  @Prop({
    type: Date,
  })
  [UserFields.ResetPasswordExpire]: Date;

  @Prop({
    type: Date,
    default: Date.now,
  })
  [UserFields.CreatedAt]: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<User>('save', async function(next) {
  if (!this.isModified(UserFields.Password)) {
    next();
  }

  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
});