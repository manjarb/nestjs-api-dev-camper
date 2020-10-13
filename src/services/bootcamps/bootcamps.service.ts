import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateBootcampDto } from '@dto/bootcamp/create-bootcamp.dto';
import { PaginationQueryDto } from '@dto/pagination-query.dto';
import { UpdateBootcampDto } from '@dto/bootcamp/update-bootcamp.dto';
import { BootcampAdvancedRequestQueryDto } from '@dto/advanced-query.dto';

import { Bootcamp } from '@entities/bootcamp/bootcamp.entity';
import { BootcampFields } from '@entities/bootcamp/bootcamp.entity';

import {
  AdvancedQueryService,
  IAdvancedData,
} from '@services/advanced-query/advanced-query.service';

import { GeocoderService } from '@utils/geocoder.util';

@Injectable()
export class BootcampsService {
  constructor(
    @InjectModel(Bootcamp.name) private readonly bootcampModel: Model<Bootcamp>,
    private advancedQueryService: AdvancedQueryService,
  ) {}

  findAll(
    paginationQuery: BootcampAdvancedRequestQueryDto,
  ): Promise<IAdvancedData<Bootcamp>> {
    return this.advancedQueryService.getAdvancedQuery(
      paginationQuery,
      this.bootcampModel,
      BootcampFields.Courses,
    );
  }

  async findOne(id: string): Promise<Bootcamp> {
    const bootcamp = await this.bootcampModel.findOne({ _id: id });
    if (!bootcamp) {
      throw new NotFoundException(`Bootcamp #${id} not found`);
    }
    return bootcamp;
  }

  async findInRadius(
    zipcode: string,
    distance: number,
    paginationQuery: PaginationQueryDto,
  ): Promise<IAdvancedData<Bootcamp>> {
    // Get lat/lng from geocoder
    const loc = await GeocoderService.geocoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;

    // Calc radius using radians
    // Divide dist by radius of Earth
    // Earth Radius = 3,963 mi / 6,378 km
    const radius = distance / 3963;

    return this.advancedQueryService.getAdvancedQuery(
      {
        ...paginationQuery,
        location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
      },
      this.bootcampModel,
    );
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
    return coffee.remove();
  }
}
