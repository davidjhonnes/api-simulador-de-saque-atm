import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { LoginService } from '../../service/login/login.service';
import { AuthenticatedDto } from '../../core/dto/auth/authenticated.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SingleResponseApiDto } from '../../core/dto/response/SingleResponseApiDto';
import GenericErrorDto from '../../core/dto/errors/generic-errors.dto';
import { AuthDto } from '../../core/dto/auth/auth.dto';
import { AuthGuard } from './auth.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  login(
    @Body() auth: AuthDto,
  ): Promise<SingleResponseApiDto<AuthenticatedDto | GenericErrorDto>> {
    return this.loginService.authentication(auth);
  }

  @ApiBearerAuth('Authorization')
  @UseGuards(AuthGuard)
  @Post('refresh-token')
  refreshToken() {
    return this.loginService.findAll();
  }
}
