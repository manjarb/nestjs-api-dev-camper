import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('bootcamps')
@Controller('bootcamps')
export class BootcampsController {
  @Get()
  findAll(): any {
    return {
      test: 'test',
    };
  }

  @Get(':id')
  findOne(
    @Param('id')
    id: string,
  ): void {}

  @Post()
  create(@Body() body): void {}

  @Patch(':id')
  update(
    @Param('id') id: string,
    // Validation for only body of this route
    // @Body(ValidationPipe) body: UpdateCoffeeDto,
  ): void {}

  @Delete(':id')
  remove(@Param('id') id: string): void {}
}
