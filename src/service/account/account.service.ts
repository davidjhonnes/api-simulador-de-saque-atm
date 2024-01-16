import { BadRequestException, Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Error, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { CreateAccountDto } from '../../core/dto/account/create-account.dto';
import { UpdateAccountDto } from '../../core/dto/account/update-account.dto';
import { Account } from '../../schema/account.schema';
import { SingleResponseApiDto } from '../../core/dto/response/SingleResponseApiDto';
import { AccountDto } from '../../core/dto/account/account.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import GenericErrorDto from '../../core/dto/errors/generic-errors.dto';

@Injectable()
export class AccountService {
  constructor(@InjectModel(Account.name) private model: Model<Account>) {}

  async create(
    createAccountDto: CreateAccountDto,
  ): Promise<SingleResponseApiDto<AccountDto>> {
    try {
      const account = await this.model.create({ ...createAccountDto });
      return new SingleResponseApiDto(account, !!account.id, null);
    } catch (e: any | ExceptionsHandler | Error) {
      const error: GenericErrorDto = new GenericErrorDto(
        e?.status,
        JSON.stringify(e),
        'Erro ao criar Conta',
      );
      throw new BadRequestException(e?.parent, { cause: error });
    }
  }

  findAll() {
    return `This action returns all account`;
  }

  findOne(id: number) {
    return `This action returns a #${id} account`;
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
