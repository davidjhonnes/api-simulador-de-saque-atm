import { BadRequestException, Injectable } from '@nestjs/common';
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

@Injectable()
export class WithdrawService {
  constructor(
    @InjectModel(Atm.name) private modelAtm: Model<Atm>,
    @InjectModel(Account.name) private modelAcc: Model<Account>,
    @InjectModel(MoneyExchangeAvaiable.name)
    private model: Model<MoneyExchangeAvaiable>,
  ) {}
  async doWithDraw(
    createWithdrawDto: CreateWithdrawDto,
  ): Promise<SingleResponseApiDto<WithdrawDto | GenericErrorDto>> {
    try {
      const moneyNotes: MoneyExchangeAvaiable = await this.model
        .findOne({ atm: createWithdrawDto.atm })
        .exec();
      const account: Account = await this.modelAcc.findOne().exec();

      const businessWithDraw: WithdrawBusiness = new WithdrawBusiness();
      const notesAvailable: NotesAvailableToPush =
        businessWithDraw.checkNotesAvailable(moneyNotes);
      const notesWithDraw: ResultWithDraw = businessWithDraw.getNotes(
        notesAvailable,
        createWithdrawDto.value,
        account.currentBalanceAccount,
      );
      for (const noteLs in notesWithDraw.withdrawnNotes) {
        console.log('note ddddd', noteLs);
        moneyNotes[`notes${noteLs}`] =
          moneyNotes[`notes${noteLs}`] - notesWithDraw.withdrawnNotes[noteLs];
      }
      console.log('moneyNotes moneyNotes', moneyNotes);

      moneyNotes.save();
      console.log('notesWithDraw', notesWithDraw);
      const result: WithdrawDto = {
        success: true,
        idTransaction: 'asdadsdasd',
        balanceCurrent: notesWithDraw.currentBalance,
        resultWithDraw: notesWithDraw,
      };
      return new SingleResponseApiDto(
        result ? result : {},
        !!moneyNotes._id,
        null,
      );
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
