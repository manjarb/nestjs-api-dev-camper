import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseFilters,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Bootcamp } from '@entities/bootcamp/bootcamp.entity';
import { ValidationErrorFilter } from '@filters/validation-error/validation-error.filter';
import { BootcampsService } from '@services/bootcamps/bootcamps.service';
import { CreateBootcampDto } from '@dto/bootcamp/create-bootcamp.dto';
import { MongoErrorFilter } from '@filters/mongo-error/mongo-error.filter';

@ApiTags('bootcamps')
@Controller('api/v1/bootcamps')
@UseFilters(ValidationErrorFilter, MongoErrorFilter)
export class BootcampsController {
  constructor(private bootcampsService: BootcampsService) {}

  // @Get()
  // findAll(): any {
  //   return {
  //     test: 'test',
  //   };
  // }

  // @Get(':id')
  // findOne(
  //   @Param('id')
  //   id: string,
  // ): void {}

  @Post()
  create(@Body() body: CreateBootcampDto): Promise<Bootcamp> {
    return this.bootcampsService.create(body);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   // Validation for only body of this route
  //   // @Body(ValidationPipe) body: UpdateCoffeeDto,
  // ): void {}

  // @Delete(':id')
  // remove(@Param('id') id: string): void {}
}
