import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RiotService } from 'src/riot/riot.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService, private readonly riotService: RiotService) { }

  private create(name: string, tagLine: string) {
    return this.prismaService.user.create({
      data: {
        name,
        tagLine
      }
    })
  }

  findAll() {
    return this.prismaService.user.findMany()
  }

  async ensureUser(name: string, tagLine: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        name,
        tagLine
      }
    })

    if (user) {
      return user
    }
    const userFromRiot = await this.riotService.getPlayerInfo(name, tagLine)
    const newUser = await this.create(userFromRiot.gameName, userFromRiot.tagLine)
    return newUser
  }

  findUserSuccesses(userId: number) {
    return this.prismaService.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        successes: {
          include: {
            success: {
              include: {
                champion: true
              }
            }
          }
        }
      }
    })
  }

  findOne(id: number) {
    return this.prismaService.user.findFirst({
      where: {
        id
      }
    })
  }
}
