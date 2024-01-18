import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { request, Request } from 'express';
import { CastError, Error, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import GenericErrorDto from '../../core/dto/errors/generic-errors.dto';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { Atm } from '../../schema/atm.schema';
import { Account } from '../../schema/account.schema';
import { Transaction } from '../../schema/transaction.schema';
import { CreateTransactionDto } from '../../core/dto/transaction/create-transaction.dto';
import { TransactionSearchDto } from '../../core/dto/transaction/transaction-search.dto';
import { PaginatedResponseDto } from '../../core/dto/response/PaginatedResponseDto';
import { TransactionDto } from '../../core/dto/transaction/transaction.dto';
import CustomBadRequest from '../../core/dto/errors/CustomBadRequest';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Atm.name) private modelAtm: Model<Atm>,
    @InjectModel(Transaction.name) private model: Model<Transaction>,
    @InjectModel(Account.name) private modelAcc: Model<Account>,
    @Inject(REQUEST) private readonly request: Request,
  ) {}
  async doTransaction(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    try {
      const transaction: Transaction =
        await this.model.create(createTransactionDto);
      const account: Account = await this.modelAcc
        .findById(createTransactionDto.account)
        .exec();

      account.currentBalanceAccount = transaction.balanceInCurrentLine;
      account.save();
      return transaction;
    } catch (e: any | ExceptionsHandler | Error | CastError) {
      throw new CustomBadRequest(
        e.cause ? e.cause.errorCode : e?.status,
        e,
      ).getError();
    }
  }

  async findByAccount({
    page,
    pageSize,
  }: TransactionSearchDto): Promise<PaginatedResponseDto<TransactionDto>> {
    try {
      const user = this.request['user'];
      const query = {
        account: user?.sub,
      };
      const qtdItems = pageSize ? pageSize : 15;
      const count = await this.model.countDocuments(query).exec();
      const pageTotal = Math.floor((count - 1) / qtdItems) + 1;

      const transactions = await this.model
        .find(query)
        .limit(qtdItems)
        .skip(page ? page - 1 : 0)
        .exec();
      console.log('transactions', transactions);

      const listDto = transactions.map((tr) => new TransactionDto(tr));
      console.log('listDto', listDto);
      return new PaginatedResponseDto<TransactionDto>(
        listDto,
        count,
        page,
        pageSize,
        pageTotal,
      );
    } catch (e: any | ExceptionsHandler | Error | CastError) {
      throw new CustomBadRequest(
        e.cause ? e.cause.errorCode : e?.status,
        e,
      ).getError();
    }
  }
}
