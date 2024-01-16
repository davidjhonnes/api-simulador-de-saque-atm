import { BadRequestException, Injectable } from '@nestjs/common';
import { MongoError } from 'mongodb';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { InjectModel } from '@nestjs/mongoose';
import { CreateMoneyExchangeAvailableDto } from '../../core/dto/money-exchange-available/create-money-exchange-available.dto';
import { UpdateMoneyExchangeAvailableDto } from '../../core/dto/money-exchange-available/update-money-exchange-available.dto';
import { Error, Model, CastError } from 'mongoose';
import { Atm } from '../../schema/atm.schema';
import { MoneyExchangeAvaiable } from '../../schema/moneyexchange.schema';
import { SingleResponseApiDto } from '../../core/dto/response/SingleResponseApiDto';
import { MoneyExchangeAvailableDto } from '../../core/dto/money-exchange-available/money-exchange-available.dto';
import GenericErrorDto from '../../core/dto/errors/generic-errors.dto';

@Injectable()
export class MoneyExchangeAvailableService {
  constructor(
    @InjectModel(Atm.name) private modelAtm: Model<Atm>,
    @InjectModel(MoneyExchangeAvaiable.name)
    private model: Model<MoneyExchangeAvaiable>,
  ) {}
  create(createMoneyExchangeAvailableDto: CreateMoneyExchangeAvailableDto) {
    return 'This action adds a new moneyExchangeAvailable';
  }

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
      const error: GenericErrorDto = new GenericErrorDto(
        e?.status,
        JSON.stringify(e.message),
        'Erro durante a autenticação',
      );
      throw new BadRequestException(e?.parent, { cause: error });
    }
  }

  findAll() {
    return `This action returns all moneyExchangeAvailable`;
  }

  findOne(id: number) {
    return `This action returns a #${id} moneyExchangeAvailable`;
  }

  update(
    id: number,
    updateMoneyExchangeAvailableDto: UpdateMoneyExchangeAvailableDto,
  ) {
    return `This action updates a #${id} moneyExchangeAvailable`;
  }

  remove(id: number) {
    return `This action removes a #${id} moneyExchangeAvailable`;
  }
}
