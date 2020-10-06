import { IsOptional } from 'class-validator';
import { PaginationQueryDto } from './pagination-query.dto';

export interface IMongoOperator {
  gt?: string;
  gte?: string;
  lt?: string;
  lte?: string;
  in?: string;
}

export class AdvancedRequestQueryDto extends PaginationQueryDto {
  @IsOptional()
  averageCost?: IMongoOperator;

  @IsOptional()
  careers?: IMongoOperator;

  @IsOptional()
  location?: {
    $geoWithin: {
      $centerSphere: [[number, number], number];
    };
  };
}
