import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  SetMetadata,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { Course } from '@entities/course/course.entity';
import { Bootcamp } from '@entities/bootcamp/bootcamp.entity';
import { UserRoles } from '@entities/user/user.entity';

import { ValidationErrorFilter } from '@filters/validation-error/validation-error.filter';
import { MongoErrorFilter } from '@filters/mongo-error/mongo-error.filter';
import { CastErrorFilter } from '@filters/cast-error/cast-error.filter';

import { BootcampsService } from '@services/bootcamps/bootcamps.service';
import { IAdvancedData } from '@services/advanced-query/advanced-query.service';
import { CoursesService } from '@services/courses/courses.service';

import { CreateBootcampDto } from '@dto/bootcamp/create-bootcamp.dto';
import { PaginationQueryDto } from '@dto/pagination-query.dto';
import { UpdateBootcampDto } from '@dto/bootcamp/update-bootcamp.dto';
import { CreateCourseDto } from '@dto/course/create-course.dto';
import {
  BootcampAdvancedRequestQueryDto,
  CourseAdvancedRequestQueryDto,
} from '@dto/advanced-query.dto';

import { ApiFile } from '@decorators/api-file.decorator';
import { Roles } from '@decorators/roles.decorator';

import { JwtAuthGuard } from '@guard/jwt-auth.guard';
import { RoleAuthGuard } from '@guard/role-auth.guard';

@ApiTags('bootcamps')
@Controller('api/v1/bootcamps')
@UseFilters(ValidationErrorFilter, CastErrorFilter, MongoErrorFilter)
export class BootcampsController {
  constructor(
    private bootcampsService: BootcampsService,
    private coursesService: CoursesService,
  ) {}

  @Get()
  findAll(
    @Query() paginationQuery: BootcampAdvancedRequestQueryDto,
  ): Promise<IAdvancedData<Bootcamp>> {
    return this.bootcampsService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(
    @Param('id')
    id: string,
  ): Promise<Bootcamp> {
    return this.bootcampsService.findOne(id);
  }

  @Get(':id/courses')
  findCourses(
    @Param('id')
    id: string,
    @Query() paginationQuery: CourseAdvancedRequestQueryDto,
  ): Promise<IAdvancedData<Course>> {
    return this.coursesService.findAll({
      ...paginationQuery,
      bootcamp: id,
    });
  }

  @Get('radius/:zipcode/:distance')
  findInRadius(
    @Param('zipcode')
    zipcode: string,
    @Param('distance')
    distance: string,
    @Query() paginationQuery: PaginationQueryDto,
  ): Promise<IAdvancedData<Bootcamp>> {
    return this.bootcampsService.findInRadius(
      zipcode,
      parseInt(distance, 10),
      paginationQuery,
    );
  }

  @Post()
  @ApiBearerAuth()
  @Roles(UserRoles.Admin, UserRoles.Publisher)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  create(@Body() body: CreateBootcampDto): Promise<Bootcamp> {
    return this.bootcampsService.create(body);
  }

  @Post(':id/courses')
  @Roles(UserRoles.Admin, UserRoles.Publisher)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  createCourse(
    @Param('id')
    id: string,
    @Body() body: CreateCourseDto,
  ): Promise<Course> {
    return this.coursesService.create(id, body);
  }

  @Patch(':id')
  @Roles(UserRoles.Admin, UserRoles.Publisher)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  update(
    @Param('id') id: string,
    @Body() body: UpdateBootcampDto,
  ): Promise<Bootcamp> {
    return this.bootcampsService.update(id, body);
  }

  @Delete(':id')
  @Roles(UserRoles.Admin, UserRoles.Publisher)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  remove(@Param('id') id: string): Promise<Bootcamp> {
    return this.bootcampsService.remove(id);
  }

  @Post(':id/photo')
  @ApiConsumes('multipart/form-data')
  @ApiFile('file')
  @UseInterceptors(
    FileInterceptor('file', {
      // Storage to save a file to the disk
      storage: diskStorage({
        destination: process.env.FILE_UPLOAD_PATH,
      }),
    }),
  )
  @Roles(UserRoles.Admin, UserRoles.Publisher)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  photoUpload(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<string | void> {
    return this.bootcampsService.photoUpload(id, file);
  }
}
