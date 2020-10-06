import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Bootcamp } from '@entities/bootcamp/bootcamp.entity';
import { BootcampsService } from '@services/bootcamps/bootcamps.service';
import { mockBootcamps } from '../data/bootcamps';

@Injectable()
export class SeederService {
  constructor(
    @InjectModel(Bootcamp.name) private readonly bootcampModel: Model<Bootcamp>,
    private readonly logger: Logger,
    private readonly bootcampsService: BootcampsService,
  ) {}

  async seed(): Promise<void> {
    try {
      await this.seedBootcamps();
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async delete(): Promise<void> {
    try {
      await this.deleteBootcamps();
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async seedBootcamps(): Promise<void> {
    try {
      for (const b of mockBootcamps) {
        const bootcamp = await this.bootcampsService.create(b);
        this.logger.debug(`Created Bootcamp id: `, bootcamp._id);
      }
      this.logger.debug('Success Seed Bootcamps');
    } catch (error) {
      this.logger.error('Bootcamp seed error: ', error);
      throw error;
    }
  }

  async deleteBootcamps(): Promise<void> {
    try {
      await this.bootcampModel.deleteMany({});
      this.logger.debug('Success Delete Bootcamps');
    } catch (error) {
      this.logger.error('Delete Bootcamp error: ', error);
      throw error;
    }
  }
}
