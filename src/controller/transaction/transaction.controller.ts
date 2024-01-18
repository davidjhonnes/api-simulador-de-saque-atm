import {
  Controller,
  Get,
  Post,
  Body,
  UseFilters,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { CreateTransactionDto } from '../../core/dto/transaction/create-transaction.dto';
import { TransactionService } from '../../service/transaction/transaction.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiOkResponseSingle } from '../../core/dto/response/ApiOkResponseSingle';
import { HttpExceptionFilter } from '../../core/dto/errors/http-request-filter';
import { AuthGuard } from '../auth/auth.guard';
import { TransactionDto } from '../../core/dto/transaction/transaction.dto';
import { Request } from 'express';
import { TransactionSearchDto } from '../../core/dto/transaction/transaction-search.dto';
import { PaginatedResponseDto } from '../../core/dto/response/PaginatedResponseDto';

@ApiTags('Transações')
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @ApiBearerAuth('Authorization')
  @Post()
  @ApiOkResponseSingle(TransactionDto)
  @UseFilters(new HttpExceptionFilter())
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.doTransaction(createTransactionDto);
  }

  @ApiBearerAuth('Authorization')
  @ApiOkResponseSingle(TransactionDto)
  @UseFilters(new HttpExceptionFilter())
  @UseGuards(AuthGuard)
  @Get('list')
  listByAccount(
    @Query() queryParam: TransactionSearchDto,
    @Req() req: Request,
  ): Promise<PaginatedResponseDto<TransactionDto>> {
    return this.transactionService.findByAccount(queryParam);
  }
}
