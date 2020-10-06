import { Injectable, Logger } from '@nestjs/common';
import { BootcampsService } from '@services/bootcamps/bootcamps.service';
import { mockBootcamps } from '../data/bootcamps';

@Injectable()
export class SeederService {
  constructor(
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

  async seedBootcamps(): Promise<void> {
    try {
      for (const b of mockBootcamps) {
        const bootcamp = await this.bootcampsService.create(b);
        this.logger.debug(`Created Bootcamp id: `, bootcamp._id);
      }
      this.logger.error('Success seed Bootcamps');
    } catch (error) {
      this.logger.error('Bootcamp seed error: ', error);
      throw error;
    }
  }
}
