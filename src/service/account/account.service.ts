import { BadRequestException, Inject, Injectable, Scope } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Error, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { CreateAccountDto } from '../../core/dto/account/create-account.dto';
import { UpdateAccountDto } from '../../core/dto/account/update-account.dto';
import { Account } from '../../schema/account.schema';
import { SingleResponseApiDto } from '../../core/dto/response/SingleResponseApiDto';
import { AccountDto } from '../../core/dto/account/account.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

import GenericErrorDto from '../../core/dto/errors/generic-errors.dto';
import CustomBadRequest from '../../core/dto/errors/CustomBadRequest';

@Injectable({ scope: Scope.REQUEST })
export class AccountService {
  constructor(
    @InjectModel(Account.name) private model: Model<Account>,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  async create(
    createAccountDto: CreateAccountDto,
  ): Promise<SingleResponseApiDto<AccountDto>> {
    try {
      const account = await this.model.create({ ...createAccountDto });
      return new SingleResponseApiDto(account, !!account.id, null);
    } catch (e: any | ExceptionsHandler | Error) {
      throw new CustomBadRequest(
        e.cause ? e.cause.errorCode : e?.status,
        e,
      ).getError();
    }
  }

  async findAll(): Promise<SingleResponseApiDto<AccountDto[]>> {
    try {
      const account = await this.model.find();
      return new SingleResponseApiDto(
        account ? account : [],
        !!account[0]._id,
        null,
      );
    } catch (e: any | ExceptionsHandler | Error) {
      throw new CustomBadRequest(
        e.cause ? e.cause.errorCode : e?.status,
        e,
      ).getError();
    }
  }

  async findOne(idAccount?: string): Promise<SingleResponseApiDto<AccountDto>> {
    try {
      const account = await this.model.findById(idAccount, '-password');
      return new SingleResponseApiDto(account, !!account._id, null);
    } catch (e: any | ExceptionsHandler | Error) {
      throw new CustomBadRequest(
        e.cause ? e.cause.errorCode : e?.status,
        e,
      ).getError();
    }
  }

  async finMyAccount(): Promise<SingleResponseApiDto<AccountDto>> {
    try {
      const account = await this.model.findById(
        this.request['user']?.sub,
        '-password',
      );
      return new SingleResponseApiDto(account, !!account._id, null);
    } catch (e: any | ExceptionsHandler | Error) {
      throw new CustomBadRequest(
        e.cause ? e.cause.errorCode : e?.status,
        e,
      ).getError();
    }
  }
}
