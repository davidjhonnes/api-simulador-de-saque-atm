import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Atm } from '../../schema/atm.schema';
import { CastError, Error, Model } from 'mongoose';
import { SingleResponseApiDto } from '../../core/dto/response/SingleResponseApiDto';
import GenericErrorDto from '../../core/dto/errors/generic-errors.dto';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { AtmDto } from '../../core/dto/atm/atm.dto';
import CustomBadRequest from '../../core/dto/errors/CustomBadRequest';

@Injectable()
export class AtmService {
  constructor(@InjectModel(Atm.name) private model: Model<Atm>) {}

  async findAll(): Promise<SingleResponseApiDto<AtmDto[] | GenericErrorDto>> {
    try {
      const atm: Atm[] = await this.model
        .find({ isActive: true })
        .populate('moneyAvailable')
        .exec();
      return new SingleResponseApiDto(atm ? atm : [], !!atm[0]._id, null);
    } catch (e: any | ExceptionsHandler | Error | CastError) {
      throw new CustomBadRequest(
        e.cause ? e.cause.errorCode : e?.status,
        e,
      ).getError();
    }
  }
}
