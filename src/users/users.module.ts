import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RiotModule } from 'src/riot/riot.module';

@Module({
  imports: [PrismaModule, RiotModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule { }
