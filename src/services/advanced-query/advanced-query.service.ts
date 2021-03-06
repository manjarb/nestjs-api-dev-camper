import { Injectable } from '@nestjs/common';
import { Model, Document, DocumentQuery } from 'mongoose';

import { BootcampAdvancedRequestQueryDto } from '@dto/advanced-query.dto';

enum Fields {
  Select = 'select',
  Sort = 'sort',
  Page = 'page',
  Limit = 'limit',
  CreatedAt = 'createdAt',
}

enum Default {
  Page = 1,
  Limit = 25,
}

interface IPaginationData {
  page: number;
  limit: number;
}

interface IPagination {
  next?: IPaginationData;
  prev?: IPaginationData;
}

export interface IAdvancedData<T> {
  count: number;
  pagination: IPagination;
  data: T[];
}

export interface IPopulatePath {
  path: string;
  select: string;
}

@Injectable()
export class AdvancedQueryService {
  async getAdvancedQuery<T extends Document>(
    advancedRequestQuery: BootcampAdvancedRequestQueryDto,
    model: Model<T>,
    populate?: IPopulatePath | string,
  ): Promise<IAdvancedData<T>> {
    let query: DocumentQuery<T[], T>;

    // Copy req.query
    const reqQuery = { ...advancedRequestQuery };

    // Fields to exclude
    const removeFields = [
      Fields.Select,
      Fields.Sort,
      Fields.Page,
      Fields.Limit,
    ];

    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);

    // Create query string
    let queryStr = JSON.stringify(reqQuery);

    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      match => `$${match}`,
    );

    // Finding resource
    query = model.find(JSON.parse(queryStr));

    // Select Fields
    if (advancedRequestQuery.select) {
      const fields = advancedRequestQuery.select.split(',').join(' ');
      query = query.select(fields);
    }

    // Sort
    if (advancedRequestQuery.sort) {
      const sortBy = advancedRequestQuery.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort(`-${Fields.CreatedAt}`);
    }

    // Pagination
    const page = parseInt(advancedRequestQuery.page, 10) || Default.Page;
    const limit = parseInt(advancedRequestQuery.limit, 10) || Default.Limit;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await model.countDocuments(JSON.parse(queryStr));

    query = query.skip(startIndex).limit(limit);

    if (populate) {
      query = query.populate(populate);
    }

    // Executing query
    const results = await query;

    // Pagination result
    const pagination: IPagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }

    return {
      count: results.length,
      pagination,
      data: results,
    };
  }
}
