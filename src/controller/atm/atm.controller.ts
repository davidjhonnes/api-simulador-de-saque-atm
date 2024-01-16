import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AtmService } from '../../service/atm/atm.service';
import { CreateAtmDto } from '../../core/dto/atm/create-atm.dto';
import { UpdateAtmDto } from '../../core/dto/atm/update-atm.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('ATMS (Caixas eletrônicos)')
@Controller('atm')
export class AtmController {
  constructor(private readonly atmService: AtmService) {}

  @Post()
  create(@Body() createAtmDto: CreateAtmDto) {
    return this.atmService.create(createAtmDto);
  }

  @Get()
  findAll() {
    return this.atmService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.atmService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAtmDto: UpdateAtmDto) {
    return this.atmService.update(+id, updateAtmDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.atmService.remove(+id);
  }
}
