import { BadRequestException, Injectable } from '@nestjs/common';
import GenericErrorDto from '../../core/dto/errors/generic-errors.dto';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { CastError, Error, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Atm } from '../../schema/atm.schema';
import { Account } from '../../schema/account.schema';
import { Transaction } from '../../schema/transaction.schema';
import { CreateTransactionDto } from '../../core/dto/transaction/create-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Atm.name) private modelAtm: Model<Atm>,
    @InjectModel(Transaction.name) private model: Model<Transaction>,
    @InjectModel(Account.name) private modelAcc: Model<Account>,
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
      const error: GenericErrorDto = new GenericErrorDto(
        e?.status,
        JSON.stringify(e.message),
        'Erro durante a autenticação',
      );
      throw new BadRequestException(e?.parent, { cause: error });
    }
  }
}
