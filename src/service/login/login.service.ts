import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthenticatedDto } from '../../core/dto/auth/authenticated.dto';
import { AuthDto } from '../../core/dto/auth/auth.dto';
import { SingleResponseApiDto } from '../../core/dto/response/SingleResponseApiDto';
import { Account } from '../../schema/account.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Error, Model } from 'mongoose';
import { Customer } from '../../schema/customer.schema';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import GenericErrorDto from '../../core/dto/errors/generic-errors.dto';

@Injectable()
export class LoginService {
  constructor(
    @InjectModel(Account.name) private model: Model<Account>,
    @InjectModel(Customer.name) private modelCustomer: Model<Customer>,
  ) {}

  async authentication(
    credentials: AuthDto,
  ): Promise<SingleResponseApiDto<AuthenticatedDto>> {
    try {
      const account: Account = await this.model
        .findOne({
          accountNumber: credentials.account,
          accountNumberDigit: credentials.digit,
          password: credentials.password,
        })
        .populate('customer', '-_id name', this.modelCustomer)
        .exec();

      const authenticated: AuthenticatedDto = {
        accountNumber: account.accountNumber,
        accountDigitNumber: account.accountNumberDigit,
        name: '',
        accessToken: 'aqweqweqweqe',
      };

      return new SingleResponseApiDto(authenticated, !!authenticated, null);
    } catch (e: any | ExceptionsHandler | Error) {
      const error: GenericErrorDto = new GenericErrorDto(
        e?.status,
        JSON.stringify(e),
        'Erro durante a autenticação',
      );
      throw new BadRequestException(e?.parent, { cause: error });
    }
  }

  findAll() {
    return `This action returns all login`;
  }

  findOne(id: number) {
    return `This action returns a #${id} login`;
  }

  update(id: number, updateLoginDto: AuthDto) {
    return `This action updates a #${id} login`;
  }

  remove(id: number) {
    return `This action removes a #${id} login`;
  }
}
