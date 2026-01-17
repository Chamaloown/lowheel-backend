import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { SuccessesService } from './successes.service';
import { verifyDto } from './dto/verify.dto';

@Controller('successes')
export class SuccessesController {
  constructor(private readonly successesService: SuccessesService) { }

  @Get()
  findAll(@Query("userId") userId: number) {
    return this.successesService.findAll({ userId });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.successesService.findOne(+id);
  }


  @Patch('/verify')
  verify(@Body() verifyDto: verifyDto) {
    return this.successesService.verify({ ...verifyDto })
  }
}
