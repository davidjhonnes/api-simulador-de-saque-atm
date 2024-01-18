import { Controller, Get, UseGuards, UseFilters } from '@nestjs/common';
import { AtmService } from '../../service/atm/atm.service';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { API_HEADER_AUTH } from '../../config/contants';
import { ApiOkResponseSingle } from '../../core/dto/response/ApiOkResponseSingle';
import { MoneyExchangeAvailableDto } from '../../core/dto/money-exchange-available/money-exchange-available.dto';
import { HttpExceptionFilter } from '../../core/dto/errors/http-request-filter';
import { SingleResponseApiDto } from '../../core/dto/response/SingleResponseApiDto';
import GenericErrorDto from '../../core/dto/errors/generic-errors.dto';
import { AtmDto } from '../../core/dto/atm/atm.dto';
@ApiTags('ATMS (Caixas eletrônicos)')
@Controller('atm')
export class AtmController {
  constructor(private readonly atmService: AtmService) {}

  @ApiBearerAuth(API_HEADER_AUTH.name)
  @ApiHeader(API_HEADER_AUTH)
  @UseGuards(AuthGuard)
  @ApiOkResponseSingle(MoneyExchangeAvailableDto)
  @UseFilters(new HttpExceptionFilter())
  @Get()
  findAll(): Promise<SingleResponseApiDto<AtmDto[] | GenericErrorDto>> {
    return this.atmService.findAll();
  }
}
