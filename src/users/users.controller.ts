import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { EnsureUserDto } from './dto/ensureUserDto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post('user')
  ensureUser(@Body() ensureUserDto: EnsureUserDto) {
    return this.usersService.ensureUser(ensureUserDto.name, ensureUserDto.tagLine)
  }

  @Get('successes/:userId')
  findUserSuccesses(@Param('userId') userId: number) {
    return this.usersService.findUserSuccesses(+userId)
  }


  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
}
