import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import {
  confirmPassword,
  generatePassword,
} from '../../business-use-case/encryption/encrypt.business';
import { AuthValidtokenDto } from '../../core/dto/auth/auth.validtoken.dto';

@Injectable()
export class LoginService {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
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
          cpf: credentials.cpf,
        })
        .populate('customer', '-_id name lastName', this.modelCustomer)
        .exec();
      if (!account) {
        throw new UnauthorizedException();
      }
      const isConfirmedPassword = await confirmPassword(
        credentials?.password,
        account.password,
      );

      if (!isConfirmedPassword) {
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

  async validateToken(): Promise<SingleResponseApiDto<AuthValidtokenDto>> {
    try {
      const user = this.request['user'];
      const account: Account = await this.model
        .findOne({ _id: user?.sub })
        .populate('customer', '-_id name lastName', this.modelCustomer)
        .exec();

      if (!account?._id) {
        throw new UnauthorizedException();
      }

      return new SingleResponseApiDto({ isTokenValid: true }, true, null);
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
