import { Body, Controller, Get, HttpStatus, Param, Patch } from '@nestjs/common';
import { SuccessesService } from './successes.service';
import { verifyDto } from './dto/verify.dto';

@Controller('successes')
export class SuccessesController {
  constructor(private readonly successesService: SuccessesService) { }

  @Get('/:userId')
  findAll(@Param('userId') userId: number) {
    return this.successesService.findAll(+userId);
  }

  @Patch('/verify')
  async verify(@Body() verifyDto: verifyDto) {
    const isVerified = await this.successesService.verify({ ...verifyDto })
    if (isVerified) {
      return { message: 'Success Unlocked. GG!', timestamp: new Date().toISOString(), statusCode: HttpStatus.OK };
    }
    return { message: 'Success Locked. Good luck next time', timestamp: new Date().toISOString(), statusCode: HttpStatus.NO_CONTENT };
  }
}
