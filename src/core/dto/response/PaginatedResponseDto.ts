import { ApiProperty } from '@nestjs/swagger';

export class PaginatedResponseDto<T> {
  constructor(
    data: T[],
    totalCount: number,
    pageCurrent: number,
    pageSize: number,
    totalPages: number,
  ) {
    this.data = data;
    this.pageCurrent = pageCurrent;
    this.pageSize = pageSize;
    this.totalCount = totalCount;
    this.totalPages = totalPages;
  }

  data: T[];
  @ApiProperty()
  totalCount: number;
  @ApiProperty()
  pageCurrent: number;
  @ApiProperty()
  pageSize: number;
  @ApiProperty()
  totalPages: number;
}
