import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum Careers {
  Web = 'Web Development',
  Mobile = 'Mobile Development',
  UI = 'UI/UX',
  Data = 'Data Science',
  Business = 'Business',
  Other = 'Other',
}

// This file have to be .entity.ts for swagger to generate correct response
@Schema()
export class Bootcamp extends Document {
  @Prop({
    type: String,
    required: [true, 'Please add a name'],
    unique: true,
    trim: true,
    maxlength: [50, 'Name can not be more than 50 characters'],
  })
  name: string;

  @Prop()
  slug: string;

  @Prop({
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description can not be more than 500 characters'],
  })
  description: string;

  @Prop({
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      'yyyyyyyy Please use a valid URL with HTTP or HTTPS',
    ],
  })
  website: string;

  @Prop({
    type: String,
    maxlength: [20, 'Phone number can not be longer than 20 characters'],
  })
  phone: string;

  @Prop({
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  })
  email: string;

  @Prop({
    type: String,
    required: [true, 'Please add an address'],
  })
  address: string;

  @Prop({
    // GeoJSON Point
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
      index: '2dsphere',
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
  })
  location: string;

  @Prop({
    // Array of strings
    type: [String],
    required: true,
    enum: [
      Careers.Web,
      Careers.Mobile,
      Careers.UI,
      Careers.Data,
      Careers.Business,
      Careers.Other,
    ],
  })
  careers: string[];

  @Prop({
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [10, 'Rating must can not be more than 10'],
  })
  averageRating: number;

  @Prop()
  averageCost: number;

  @Prop({ default: 'no-photo.jpg' })
  photo: string;

  @Prop({ default: false })
  housing: boolean;

  @Prop({
    type: Boolean,
    default: false,
  })
  jobAssistance: boolean;

  @Prop({
    type: Boolean,
    default: false,
  })
  jobGuarantee: boolean;

  @Prop({
    default: false,
  })
  acceptGi: boolean;

  @Prop({
    type: Date,
    default: Date.now,
  })
  createdAt: Date;
}

export const BootcampSchema = SchemaFactory.createForClass(Bootcamp);
