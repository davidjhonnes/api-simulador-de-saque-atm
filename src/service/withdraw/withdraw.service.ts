import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { CreateWithdrawDto } from '../../core/dto/withdraw/create-withdraw.dto';
import { SingleResponseApiDto } from '../../core/dto/response/SingleResponseApiDto';
import GenericErrorDto from '../../core/dto/errors/generic-errors.dto';
import { MoneyExchangeAvaiable } from '../../schema/moneyexchange.schema';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { CastError, Error, Model } from 'mongoose';
import { WithdrawDto } from '../../core/dto/withdraw/withdraw.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Atm } from '../../schema/atm.schema';
import { Account } from '../../schema/account.schema';
import { WithdrawBusiness } from '../../business-use-case/withdraw/withdraw.business';
import {
  NotesAvailableToPush,
  ResultWithDraw,
} from '../../business-use-case/withdraw/interfaces/withdraw.interface';
import {
  OriginTransactionEnum,
  Transaction,
  TypeTransactionEnum,
} from '../../schema/transaction.schema';
import { TransactionService } from '../transaction/transaction.service';
import { CreateTransactionDto } from '../../core/dto/transaction/create-transaction.dto';
import CustomBadRequest from '../../core/dto/errors/CustomBadRequest';

@Injectable()
export class WithdrawService {
  constructor(
    @InjectModel(Atm.name) private modelAtm: Model<Atm>,
    @InjectModel(Transaction.name) private modelTrans: Model<Transaction>,
    @InjectModel(Account.name) private modelAcc: Model<Account>,
    @InjectModel(MoneyExchangeAvaiable.name)
    private model: Model<MoneyExchangeAvaiable>,
    @Inject(REQUEST) private readonly request: Request,
    private readonly transactionService: TransactionService,
  ) {}
  async doWithDraw(
    createWithdrawDto: CreateWithdrawDto,
  ): Promise<SingleResponseApiDto<WithdrawDto | GenericErrorDto>> {
    try {
      let transaction: Transaction = null;
      let result: WithdrawDto = null;
      const moneyNotes: MoneyExchangeAvaiable = await this.model
        .findOne({ atm: createWithdrawDto.atm })
        .exec();

      console.log('MONEY', moneyNotes);
      const account: Account = await this.modelAcc
        .findById(this.request['user']?.sub)
        .exec();
      if (account.currentBalanceAccount < createWithdrawDto.value) {
        throw new CustomBadRequest(
          400,
          new Error('Saldo Insuficiente'),
          'Saldo Insuficiente',
        ).getError();
      }
      const businessWithDraw: WithdrawBusiness = new WithdrawBusiness();
      const notesAvailable: NotesAvailableToPush =
        businessWithDraw.checkNotesAvailable(moneyNotes);

      const notesWithDraw: ResultWithDraw = businessWithDraw.getNotes(
        notesAvailable,
        createWithdrawDto.value,
        account.currentBalanceAccount,
      );

      if (notesWithDraw.insufficientNotes) {
        throw new CustomBadRequest(
          400,
          new Error('Notas insuficintes'),
          'Notas há notas suficientes para sacar o valor desejado',
        ).getError();
      }

      if (!!notesWithDraw) {
        const transactionDTO: CreateTransactionDto = {
          account: account._id,
          originTransaction: OriginTransactionEnum.atm,
          accountNumber: account.accountNumber,
          atm: moneyNotes.atm.toString(),
          typeTransaction: TypeTransactionEnum.debit,
          value: createWithdrawDto.value,
          balanceInCurrentLine: notesWithDraw.currentBalance,
          dateTransaction: new Date(),
          isValid: true,
        };
        transaction =
          await this.transactionService.doTransaction(transactionDTO);

        for (const noteLs in notesWithDraw.withdrawnNotes) {
          console.log('note ddddd', noteLs);
          moneyNotes[`notes${noteLs}`] =
            moneyNotes[`notes${noteLs}`] - notesWithDraw.withdrawnNotes[noteLs];
        }
        console.log('moneyNotes moneyNotes', moneyNotes);

        moneyNotes.save();
        console.log('notesWithDraw', notesWithDraw);
        result = {
          success: true,
          idTransaction: transaction._id.toString(),
          balanceCurrent: notesWithDraw.currentBalance,
          resultWithDraw: notesWithDraw,
        };
      }
      return new SingleResponseApiDto(
        result ? result : {},
        !!moneyNotes._id,
        null,
      );
    } catch (e: any | ExceptionsHandler | Error | CastError) {
      throw new CustomBadRequest(
        e.cause ? e.cause.errorCode : e?.status,
        e,
      ).getError();
    }
  }
}
