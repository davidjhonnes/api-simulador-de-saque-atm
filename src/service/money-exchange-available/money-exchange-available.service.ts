import { Injectable } from '@nestjs/common';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { InjectModel } from '@nestjs/mongoose';
import { Error, Model, CastError } from 'mongoose';
import { Atm } from '../../schema/atm.schema';
import { MoneyExchangeAvaiable } from '../../schema/moneyexchange.schema';
import { SingleResponseApiDto } from '../../core/dto/response/SingleResponseApiDto';
import { MoneyExchangeAvailableDto } from '../../core/dto/money-exchange-available/money-exchange-available.dto';
import GenericErrorDto from '../../core/dto/errors/generic-errors.dto';
import CustomBadRequest from '../../core/dto/errors/CustomBadRequest';

@Injectable()
export class MoneyExchangeAvailableService {
  constructor(
    @InjectModel(Atm.name) private modelAtm: Model<Atm>,
    @InjectModel(MoneyExchangeAvaiable.name)
    private model: Model<MoneyExchangeAvaiable>,
  ) {}
  async findByAtm(
    idAtm: string,
  ): Promise<
    SingleResponseApiDto<MoneyExchangeAvailableDto | GenericErrorDto>
  > {
    try {
      const moneyNotes: MoneyExchangeAvaiable = await this.model
        .findOne({ atm: idAtm })
        .exec();

      return new SingleResponseApiDto(
        moneyNotes ? moneyNotes : {},
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
