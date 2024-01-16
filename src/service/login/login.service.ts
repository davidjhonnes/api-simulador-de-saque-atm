import {BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import { AuthenticatedDto } from '../../core/dto/auth/authenticated.dto';
import { AuthDto } from '../../core/dto/auth/auth.dto';
import { SingleResponseApiDto } from '../../core/dto/response/SingleResponseApiDto';
import { Account } from '../../schema/account.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Error, Model } from 'mongoose';
import { Customer } from '../../schema/customer.schema';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import GenericErrorDto from '../../core/dto/errors/generic-errors.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
  constructor(
    @InjectModel(Account.name) private model: Model<Account>,
    @InjectModel(Customer.name) private modelCustomer: Model<Customer>,
    private jwtService: JwtService,
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
        .populate('customer', '-_id name lastName', this.modelCustomer)
        .exec();

      if (account?.password !== credentials.password) {
        throw new UnauthorizedException();
      }
      const completeName = `${account.customer.name} ${account.customer.lastName}`;
      const payload = {
        sub: account._id,
        name: completeName,
        accountNumber: account.accountNumber,
        accountDigitNumber: account.accountNumberDigit,
      };
      const access_token: string = await this.jwtService.signAsync(payload);
      const authenticated: AuthenticatedDto = {
        name: completeName,
        accessToken: access_token,
      };

      return new SingleResponseApiDto(authenticated, !!authenticated, null);
    } catch (e: any | ExceptionsHandler | Error) {
      const error: GenericErrorDto = new GenericErrorDto(
        e?.status,
        JSON.stringify(e.message),
        'Erro durante a autenticação',
      );
      console.error(error);
      if (error.errorCode === 401) {
        throw new UnauthorizedException();
      } else {
        throw new BadRequestException(e?.parent, { cause: error });
      }
    }
  }

  findAll() {
    return `This action returns all login`;
  }
}
