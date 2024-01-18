import {
  Controller,
  Get,
  Param,
  UseFilters,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request } from 'express';

import { AccountService } from '../../service/account/account.service';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { ApiOkResponseSingle } from '../../core/dto/response/ApiOkResponseSingle';
import { HttpExceptionFilter } from '../../core/dto/errors/http-request-filter';
import { AccountDto } from '../../core/dto/account/account.dto';
import { SingleResponseApiDto } from '../../core/dto/response/SingleResponseApiDto';
import { AuthGuard } from '../auth/auth.guard';
import { API_HEADER_AUTH } from '../../config/contants';

@ApiTags('Contas')
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}
  @ApiBearerAuth(API_HEADER_AUTH.name)
  @ApiHeader(API_HEADER_AUTH)
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.accountService.findAll();
  }
  @ApiBearerAuth(API_HEADER_AUTH.name)
  @ApiHeader(API_HEADER_AUTH)
  @ApiOkResponseSingle(AccountDto)
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountService.findOne(id);
  }
  @ApiBearerAuth(API_HEADER_AUTH.name)
  @ApiHeader(API_HEADER_AUTH)
  @ApiOkResponseSingle(AccountDto)
  @UseFilters(new HttpExceptionFilter())
  @Get('profile/myAccount')
  @UseGuards(AuthGuard)
  findMyAccount(
    @Req() req: Request,
  ): Promise<SingleResponseApiDto<AccountDto>> {
    return this.accountService.finMyAccount();
  }
}
