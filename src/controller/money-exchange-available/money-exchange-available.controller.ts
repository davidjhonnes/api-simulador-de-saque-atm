import { Controller, Get, Param, UseFilters, UseGuards } from '@nestjs/common';
import { MoneyExchangeAvailableService } from '../../service/money-exchange-available/money-exchange-available.service';
import { ApiOkResponseSingle } from '../../core/dto/response/ApiOkResponseSingle';
import { HttpExceptionFilter } from '../../core/dto/errors/http-request-filter';
import { MoneyExchangeAvailableDto } from '../../core/dto/money-exchange-available/money-exchange-available.dto';
import { SingleResponseApiDto } from '../../core/dto/response/SingleResponseApiDto';
import GenericErrorDto from '../../core/dto/errors/generic-errors.dto';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { API_HEADER_AUTH } from '../../config/contants';

@ApiTags('DISPONIBILIDADE DE NOTAS')
@Controller('money-exchange-available')
export class MoneyExchangeAvailableController {
  constructor(
    private readonly moneyExchangeAvailableService: MoneyExchangeAvailableService,
  ) {}

  @ApiBearerAuth(API_HEADER_AUTH.name)
  @ApiHeader(API_HEADER_AUTH)
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
}
