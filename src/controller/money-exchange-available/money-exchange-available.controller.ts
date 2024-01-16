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
import { MoneyExchangeAvailableService } from '../../service/money-exchange-available/money-exchange-available.service';
import { CreateMoneyExchangeAvailableDto } from '../../core/dto/money-exchange-available/create-money-exchange-available.dto';
import { UpdateMoneyExchangeAvailableDto } from '../../core/dto/money-exchange-available/update-money-exchange-available.dto';
import { ApiOkResponseSingle } from '../../core/dto/response/ApiOkResponseSingle';
import { HttpExceptionFilter } from '../../core/dto/errors/http-request-filter';
import { MoneyExchangeAvailableDto } from '../../core/dto/money-exchange-available/money-exchange-available.dto';
import { SingleResponseApiDto } from '../../core/dto/response/SingleResponseApiDto';
import GenericErrorDto from '../../core/dto/errors/generic-errors.dto';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {AuthGuard} from "../auth/auth.guard";

@ApiTags('DISPONIBILIDADE DE NOTAS')
@Controller('money-exchange-available')
export class MoneyExchangeAvailableController {
  constructor(
    private readonly moneyExchangeAvailableService: MoneyExchangeAvailableService,
  ) {}

  @ApiBearerAuth('Authorization')
  @Post()
  create(
    @Body() createMoneyExchangeAvailableDto: CreateMoneyExchangeAvailableDto,
  ) {
    return this.moneyExchangeAvailableService.create(
      createMoneyExchangeAvailableDto,
    );
  }

  @ApiBearerAuth('Authorization')
  @UseGuards(AuthGuard)
  @Get('checkNotes/:idAtm')
  @ApiOkResponseSingle(MoneyExchangeAvailableDto)
  @UseFilters(new HttpExceptionFilter())
  findByAtm(
    @Param('idAtm') idAtm: string,
  ): Promise<
    SingleResponseApiDto<MoneyExchangeAvailableDto | GenericErrorDto>
  > {
    return this.moneyExchangeAvailableService.findByAtm(idAtm);
  }

  @ApiBearerAuth('Authorization')
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moneyExchangeAvailableService.findOne(+id);
  }

  @ApiBearerAuth('Authorization')
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMoneyExchangeAvailableDto: UpdateMoneyExchangeAvailableDto,
  ) {
    return this.moneyExchangeAvailableService.update(
      +id,
      updateMoneyExchangeAvailableDto,
    );
  }

  @ApiBearerAuth('Authorization')
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moneyExchangeAvailableService.remove(+id);
  }
}
