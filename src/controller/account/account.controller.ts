import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
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

@ApiTags('Contas')
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  @ApiTags('CONTAS')
  @ApiOkResponseSingle(AccountDto)
  @UseFilters(new HttpExceptionFilter())
  create(
    @Body() createAccountDto: CreateAccountDto,
  ): Promise<SingleResponseApiDto<AccountDto | GenericErrorDto>> {
    return this.accountService.create(createAccountDto);
  }

  @Get()
  findAll() {
    return this.accountService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountService.update(+id, updateAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountService.remove(+id);
  }
}
