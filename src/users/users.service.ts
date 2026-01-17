import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) { }

  findAll() {
    return this.prismaService.user.findMany()
  }


  findOne(id: number) {
    return this.prismaService.user.findFirst({
      where: {
        id
      }
    })
  }
}
