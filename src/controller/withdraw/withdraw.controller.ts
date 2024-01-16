import {
  Controller,
  Post,
  Body,
  UseFilters,
  UseGuards,
  Request,
} from '@nestjs/common';
import { WithdrawService } from '../../service/withdraw/withdraw.service';
import { CreateWithdrawDto } from '../../core/dto/withdraw/create-withdraw.dto';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import { ApiOkResponseSingle } from '../../core/dto/response/ApiOkResponseSingle';
import { HttpExceptionFilter } from '../../core/dto/errors/http-request-filter';
import { SingleResponseApiDto } from '../../core/dto/response/SingleResponseApiDto';
import GenericErrorDto from '../../core/dto/errors/generic-errors.dto';
import { WithdrawDto } from '../../core/dto/withdraw/withdraw.dto';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('SAQUE')
@Controller('withdraw')
export class WithdrawController {
  constructor(private readonly withdrawService: WithdrawService) {}

  @ApiBearerAuth('Authorization')
  @Post()
  @ApiOkResponseSingle(WithdrawDto)
  @UseFilters(new HttpExceptionFilter())
  @UseGuards(AuthGuard)
  pullMoney(
    @Body() createWithdrawDto: CreateWithdrawDto,
    @Request() req: Request,
  ): Promise<SingleResponseApiDto<WithdrawDto | GenericErrorDto>> {
    return this.withdrawService.doWithDraw(createWithdrawDto, req);
  }
}
