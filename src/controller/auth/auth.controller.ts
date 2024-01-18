import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  UseFilters,
  Get,
  Patch,
} from '@nestjs/common';
import { Request } from 'express';
import { LoginService } from '../../service/login/login.service';
import { AuthenticatedDto } from '../../core/dto/auth/authenticated.dto';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { SingleResponseApiDto } from '../../core/dto/response/SingleResponseApiDto';
import GenericErrorDto from '../../core/dto/errors/generic-errors.dto';
import { AuthDto } from '../../core/dto/auth/auth.dto';
import { AuthGuard } from './auth.guard';
import { API_HEADER_AUTH } from '../../config/contants';
import { ApiOkResponseSingle } from '../../core/dto/response/ApiOkResponseSingle';
import { WithdrawDto } from '../../core/dto/withdraw/withdraw.dto';
import { HttpExceptionFilter } from '../../core/dto/errors/http-request-filter';
import { MoneyExchangeAvailableDto } from '../../core/dto/money-exchange-available/money-exchange-available.dto';
import { AuthValidtokenDto } from '../../core/dto/auth/auth.validtoken.dto';
import * as path from 'path';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly loginService: LoginService) {}

  @ApiOkResponseSingle(AuthenticatedDto)
  @UseFilters(new HttpExceptionFilter())
  @Post()
  login(
    @Body() auth: AuthDto,
  ): Promise<SingleResponseApiDto<AuthenticatedDto | GenericErrorDto>> {
    return this.loginService.authentication(auth);
  }
  @ApiBearerAuth('Authorization')
  @ApiOkResponseSingle(AuthValidtokenDto)
  @UseFilters(new HttpExceptionFilter())
  @UseGuards(AuthGuard)
  @Get('validToken')
  validToken(
    @Req() req: Request,
  ): Promise<SingleResponseApiDto<AuthValidtokenDto>> {
    return this.loginService.validateToken();
  }
}
