import { Controller, Post, Body, UseFilters } from '@nestjs/common';
import { WithdrawService } from '../../service/withdraw/withdraw.service';
import { CreateWithdrawDto } from '../../core/dto/withdraw/create-withdraw.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiOkResponseSingle } from '../../core/dto/response/ApiOkResponseSingle';
import { HttpExceptionFilter } from '../../core/dto/errors/http-request-filter';
import { SingleResponseApiDto } from '../../core/dto/response/SingleResponseApiDto';
import GenericErrorDto from '../../core/dto/errors/generic-errors.dto';
import { WithdrawDto } from '../../core/dto/withdraw/withdraw.dto';

@ApiTags('SAQUE')
@Controller('withdraw')
export class WithdrawController {
  constructor(private readonly withdrawService: WithdrawService) {}

  @Post()
  @ApiOkResponseSingle(WithdrawDto)
  @UseFilters(new HttpExceptionFilter())
  pullMoney(
    @Body() createWithdrawDto: CreateWithdrawDto,
  ): Promise<SingleResponseApiDto<WithdrawDto | GenericErrorDto>> {
    return this.withdrawService.doWithDraw(createWithdrawDto);
  }
}
