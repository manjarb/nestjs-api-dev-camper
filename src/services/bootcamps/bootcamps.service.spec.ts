import { Test, TestingModule } from '@nestjs/testing';
import { BootcampsService } from './bootcamps.service';

describe('BootcampsService', () => {
  let service: BootcampsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BootcampsService],
    }).compile();

    service = module.get<BootcampsService>(BootcampsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
