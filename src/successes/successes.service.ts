import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RiotService } from 'src/riot/riot.service';

@Injectable()
export class SuccessesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly riotService: RiotService,
  ) { }

  private async validate(userId: number, championId: number) {
    const success = await this.prismaService.success.findFirst({
      where: {
        champion: {
          id: championId
        }
      }
    })
    if (!success) {
      throw "Unable to find Success"
    }
    await this.prismaService.usersOnSuccesses.create({
      data: {
        successId: success?.id,
        userId
      }
    })
  }


  async findAll(userId: number) {
    const allSuccesses = await this.prismaService.success.findMany({
      include: {
        champion: true,
        role: true,
        users: {
          where: {
            userId: userId,
          },
        },
      },
    });

    return allSuccesses.reduce((acc, curr) => {
      const roleName = curr.role.name.toLowerCase();

      if (!acc[roleName]) {
        acc[roleName] = [];
      }

      acc[roleName].push({
        id: curr.id,
        champion: curr.champion,
        isCompleted: curr.users.length > 0,
      });

      return acc;
    }, {} as Record<string, any[]>);
  }


  findOne(id: number) {
    return this.prismaService.success.findFirst({
      where: {
        id
      }
    })
  }

  async verify({ userId, roleId, championId }: { userId: number, roleId: number, championId: number }) {
    // TODO CHECK ROLE
    const user = await this.prismaService.user.findFirst({
      where: {
        id: userId
      }
    })
    if (!user) throw new Error("No User")

    const info = await this.riotService.getPlayerInfo(user.name, user.tagLine)

    const latestMatchId = await this.riotService.getLatestMatchId(info.puuid)
    const fullMatchDetails = await this.riotService.getFullMatchDetails(latestMatchId)
    const player = fullMatchDetails.info.participants.find(p => p.puuid === info.puuid);
    const champion = await this.prismaService.champion.findFirst({
      where: {
        id: championId
      }
    })
    if (!champion) throw new Error("No Champion")

    if (player?.championName === champion.name && player.win) {
      this.validate(userId, championId)
      return true
    }
    return false
  }
}
