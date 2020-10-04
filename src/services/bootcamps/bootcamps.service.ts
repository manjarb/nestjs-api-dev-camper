import { PaginationQueryDto } from './../../dto/pagination-query.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bootcamp } from '../../models/bootcamp/bootcamp.model';

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
}
