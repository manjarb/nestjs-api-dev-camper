import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  // Remove @Type by enableImplicitConversion: true,
  // @Type(() => Number)
  limit: number;

  @IsOptional()
  @IsPositive()
  // Remove @Type by enableImplicitConversion: true,
  // @Type(() => Number)
  offset: number;
}
