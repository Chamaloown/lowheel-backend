import { Module } from '@nestjs/common';
import { ChampionsModule } from './champions/champions.module';
import { PrismaModule } from './prisma/prisma.module';
import { RolesModule } from './roles/roles.module';
import { successesModule } from './successes/successes.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ChampionsModule, PrismaModule, RolesModule, successesModule, UsersModule, ConfigModule.forRoot()]
})
export class AppModule { }
