import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RiotService } from 'src/riot/riot.service';

@Injectable()
export class SuccessesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly riotService: RiotService,
  ) { }

  private async validate(name: string, tagLine: string, champion: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        name: name
      }
    })
    if (!user) {
      throw "Unable to find User"
    }
    const success = await this.prismaService.success.findFirst({
      where: {
        champion: {
          name: champion
        }
      }
    })
    if (!success) {
      throw "Unable to find Success"
    }
    await this.prismaService.usersOnSuccesses.create({
      data: {
        successId: success?.id,
        userId: user?.id
      }
    })
  }


  findAll({ userId }: { userId?: number }) {
    if (!userId) {
      return this.prismaService.success.findMany()
    }

    return this.prismaService.success.findMany({
      where: {
        users: {
          some: {
            userId: +userId
          }
        }
      }
    }
    )
  }


  findOne(id: number) {
    return this.prismaService.success.findFirst({
      where: {
        id
      }
    })
  }

  async verify({ name, tagLine, champion }: { name: string, tagLine: string, champion: string }) {
    const info = await this.riotService.getPlayerInfo(name, tagLine)

    const latestMatchId = await this.riotService.getLatestMatchId(info.puuid)

    const fullMatchDetails = await this.riotService.getFullMatchDetails(latestMatchId)

    const player = fullMatchDetails.info.participants.find(p => p.puuid === info.puuid);

    if (player?.championName === champion && player.win) {
      this.validate(name, tagLine, champion)
      return true
    }

    return false
  }
}
