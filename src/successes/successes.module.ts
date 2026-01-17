import { Module } from '@nestjs/common';
import { SuccessesService } from './successes.service';
import { SuccessesController } from './successes.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RiotModule } from 'src/riot/riot.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [PrismaModule, RiotModule, UsersModule],
  controllers: [SuccessesController],
  providers: [SuccessesService],
})
export class successesModule { }
