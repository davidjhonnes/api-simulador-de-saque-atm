import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters, UseGuards,
} from '@nestjs/common';
import { AccountService } from '../../service/account/account.service';
import { CreateAccountDto } from '../../core/dto/account/create-account.dto';
import { UpdateAccountDto } from '../../core/dto/account/update-account.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiOkResponseSingle } from '../../core/dto/response/ApiOkResponseSingle';
import { HttpExceptionFilter } from '../../core/dto/errors/http-request-filter';
import { AccountDto } from '../../core/dto/account/account.dto';
import { SingleResponseApiDto } from '../../core/dto/response/SingleResponseApiDto';
import GenericErrorDto from '../../core/dto/errors/generic-errors.dto';
import {AuthGuard} from "../auth/auth.guard";

@ApiTags('Contas')
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  @ApiTags('CONTAS')
  @ApiOkResponseSingle(AccountDto)
  @UseFilters(new HttpExceptionFilter())
  @UseGuards(AuthGuard)
  create(
    @Body() createAccountDto: CreateAccountDto,
  ): Promise<SingleResponseApiDto<AccountDto | GenericErrorDto>> {
    return this.accountService.create(createAccountDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.accountService.findAll();
  }
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountService.findOne(+id);
  }
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountService.update(+id, updateAccountDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountService.remove(+id);
  }
}
