import { Injectable, Inject } from '@nestjs/common';
import { ObjectLiteral, Repository } from 'typeorm';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { paginated } from '../interfaces/pagination-interface';
import { PaginationQueryDto } from '../pagination-query-dto.dto';

@Injectable()
export class PaginationProvider {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}
  public async paginationQuery<T extends ObjectLiteral>(
    //type generic is a type that is used when we are unsure of the type of object to return
    paginatedQueryDto: PaginationQueryDto,
    repository: Repository<T>,
  ): Promise<paginated<T>> {
    const result = await repository.find({
      skip: paginatedQueryDto.limit * (paginatedQueryDto.page - 1),
      take: paginatedQueryDto.limit,
    });

    //create a request url
    //create a variable called base url
    const baseUrl =
      this.request.protocol + '://' + this.request.headers.host + '/';
    console.log(baseUrl);

    const newUrl = new URL(this.request.url, baseUrl);
    console.log(newUrl);

    const totalItems = await repository.count();
    const totalPages = Math.ceil(totalItems / paginatedQueryDto.limit);
    const currentPage = paginatedQueryDto.page;
    console.log(currentPage);
    const nextPage =
      paginatedQueryDto.page === totalPages
        ? paginatedQueryDto.page
        : paginatedQueryDto.page + 1;

    const previousPage =
      paginatedQueryDto.page === 1
        ? paginatedQueryDto.page
        : paginatedQueryDto.page - 1;

    const finalResponse: paginated<T> = {
      data: result,
      meta: {
        itemsPerPage: paginatedQueryDto.limit,
        totalItemsPerPage: totalItems,
        currentPage: paginatedQueryDto.page,
        totalPages: totalPages,
      },
      links: {
        firstPage: `${newUrl.origin}${newUrl.pathname}?limit=${paginatedQueryDto.limit}&page=1`,

        lastPage: `${newUrl.origin}${newUrl.pathname}?limit=${paginatedQueryDto.limit}&page=${totalPages}`,

        currentPage: `${newUrl.origin}${newUrl.pathname}?limit=${paginatedQueryDto.limit}&page=${currentPage}`,

        previousPage: `${newUrl.origin}${newUrl.pathname}?limit=${paginatedQueryDto.limit}&page=${previousPage}`,

        nextPage: `${newUrl.origin}${newUrl.pathname}?limit=${paginatedQueryDto.limit}&page=${nextPage}`,
      },
    };
    return finalResponse;
  }
}
