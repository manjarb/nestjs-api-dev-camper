import { Test, TestingModule } from '@nestjs/testing';
import { BootcampsController } from './bootcamps.controller';

describe('BootcampsController', () => {
  let controller: BootcampsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BootcampsController],
    }).compile();

    controller = module.get<BootcampsController>(BootcampsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
