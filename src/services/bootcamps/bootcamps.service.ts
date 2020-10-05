import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateBootcampDto } from '@dto/bootcamp/create-bootcamp.dto';
import { PaginationQueryDto } from '@dto/pagination-query.dto';
import { Bootcamp } from '@entities/bootcamp/bootcamp.entity';

@Injectable()
export class BootcampsService {
  constructor(
    @InjectModel(Bootcamp.name) private readonly bootcampModel: Model<Bootcamp>,
  ) {}

  findAll(paginationQuery: PaginationQueryDto): Promise<Bootcamp[]> {
    const { limit, offset } = paginationQuery;
    return this.bootcampModel
      .find()
      .skip(offset)
      .limit(limit)
      .exec();
  }

  async findOne(id: string): Promise<Bootcamp> {
    const bootcamp = await this.bootcampModel.findOne({ _id: id }).exec();
    if (!bootcamp) {
      throw new NotFoundException(`Bootcamp #${id} not found`);
    }
    return bootcamp;
  }

  create(createBootcamp: CreateBootcampDto): Promise<Bootcamp> {
    const bootcamp = new this.bootcampModel(createBootcamp);
    return bootcamp.save();
  }
}
