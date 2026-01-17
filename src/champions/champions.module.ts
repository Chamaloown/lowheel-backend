import { Module } from '@nestjs/common';
import { ChampionsService } from './champions.service';
import { ChampionsController } from './champions.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ChampionsController],
  providers: [ChampionsService],
})
export class ChampionsModule {}
