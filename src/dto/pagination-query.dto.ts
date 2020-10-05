import { PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

class PaginationDto {
  @IsOptional()
  limit: string;

  @IsOptional()
  page: string;

  // Sort should be like 'name,createdAt'
  @IsOptional()
  sort: string;

  // Select fields should be like 'name,createdAt'
  @IsOptional()
  select: string;

  @IsOptional()
  gt: string;

  @IsOptional()
  gte: string;

  @IsOptional()
  lt: string;

  @IsOptional()
  lte: string;

  @IsOptional()
  in: string;
}

export class PaginationQueryDto extends PartialType(PaginationDto) {}
