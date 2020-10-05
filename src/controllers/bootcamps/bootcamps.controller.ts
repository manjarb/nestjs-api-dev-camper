import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseFilters,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Bootcamp } from '@entities/bootcamp/bootcamp.entity';
import { ValidationErrorFilter } from '@filters/validation-error/validation-error.filter';
import { BootcampsService } from '@services/bootcamps/bootcamps.service';
import { CreateBootcampDto } from '@dto/bootcamp/create-bootcamp.dto';
import { MongoErrorFilter } from '@filters/mongo-error/mongo-error.filter';
import { PaginationQueryDto } from '@dto/pagination-query.dto';
import { CastErrorFilter } from '@filters/cast-error/cast-error.filter';
import { UpdateBootcampDto } from '@dto/bootcamp/update-bootcamp.dto';

@ApiTags('bootcamps')
@Controller('api/v1/bootcamps')
@UseFilters(ValidationErrorFilter, CastErrorFilter, MongoErrorFilter)
export class BootcampsController {
  constructor(private bootcampsService: BootcampsService) {}

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto): any {
    return this.bootcampsService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(
    @Param('id')
    id: string,
  ): Promise<Bootcamp> {
    return this.bootcampsService.findOne(id);
  }

  @Post()
  create(@Body() body: CreateBootcampDto): Promise<Bootcamp> {
    return this.bootcampsService.create(body);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: UpdateBootcampDto,
  ): Promise<Bootcamp> {
    return this.bootcampsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Bootcamp> {
    return this.bootcampsService.remove(id);
  }
}
