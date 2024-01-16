import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AtmService } from '../../service/atm/atm.service';
import { CreateAtmDto } from '../../core/dto/atm/create-atm.dto';
import { UpdateAtmDto } from '../../core/dto/atm/update-atm.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
@ApiTags('ATMS (Caixas eletrônicos)')
@Controller('atm')
export class AtmController {
  constructor(private readonly atmService: AtmService) {}

  @ApiBearerAuth('Authorization')
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createAtmDto: CreateAtmDto) {
    return this.atmService.create(createAtmDto);
  }

  @ApiBearerAuth('Authorization')
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.atmService.findAll();
  }
  @ApiBearerAuth('Authorization')
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.atmService.findOne(+id);
  }

  @ApiBearerAuth('Authorization')
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAtmDto: UpdateAtmDto) {
    return this.atmService.update(+id, updateAtmDto);
  }

  @ApiBearerAuth('Authorization')
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.atmService.remove(+id);
  }
}
