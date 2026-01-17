import { Controller, Get, Param, Query } from '@nestjs/common';
import { ChampionsService } from './champions.service';

@Controller('champions')
export class ChampionsController {
  constructor(private readonly championsService: ChampionsService) { }

  @Get()
  findAll(@Query('role') role: string) {
    return this.championsService.findAll(role);
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.championsService.findOne(+id);
  }
}
