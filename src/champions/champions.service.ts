import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChampionsService {
  constructor(private prismaService: PrismaService) { }

  findAll(role?: string) {
    if (!role) return this.prismaService.champion.findMany()
    return this.prismaService.champion.findMany({
      where: {
        roles: {
          some: {
            role: {
              name: role
            }
          }
        }
      },
    })
  }


  findOne(id: number) {
    return this.prismaService.champion.findFirst({
      where: {
        id
      }
    })
  }
}
