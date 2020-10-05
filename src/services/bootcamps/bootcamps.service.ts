import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateBootcampDto } from '@dto/bootcamp/create-bootcamp.dto';
import { PaginationQueryDto } from '@dto/pagination-query.dto';
import { Bootcamp } from '@entities/bootcamp/bootcamp.entity';
import { UpdateBootcampDto } from '@dto/bootcamp/update-bootcamp.dto';
import {
  AdvancedQueryService,
  IAdvancedData,
} from '@services/advanced-query/advanced-query.service';

@Injectable()
export class BootcampsService {
  constructor(
    @InjectModel(Bootcamp.name) private readonly bootcampModel: Model<Bootcamp>,
    private advancedQueryService: AdvancedQueryService,
  ) {}

  findAll(
    paginationQuery: PaginationQueryDto,
  ): Promise<IAdvancedData<Bootcamp>> {
    return this.advancedQueryService.getAdvancedQuery(
      paginationQuery,
      this.bootcampModel,
    );
  }

  async findOne(id: string): Promise<Bootcamp> {
    const bootcamp = await this.bootcampModel.findOne({ _id: id });
    if (!bootcamp) {
      throw new NotFoundException(`Bootcamp #${id} not found`);
    }
    return bootcamp;
  }

  create(createBootcamp: CreateBootcampDto): Promise<Bootcamp> {
    const bootcamp = new this.bootcampModel(createBootcamp);
    return bootcamp.save();
  }

  async update(
    id: string,
    updateBootcampDto: UpdateBootcampDto,
  ): Promise<Bootcamp> {
    const existingCoffee = await this.bootcampModel.findByIdAndUpdate(
      id,
      updateBootcampDto,
      { new: true },
    );

    if (!existingCoffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return existingCoffee;
  }

  async remove(id: string): Promise<Bootcamp> {
    const coffee = await this.findOne(id);
    return coffee.deleteOne();
  }
}
