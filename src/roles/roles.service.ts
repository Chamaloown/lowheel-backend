import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RolesService {
  constructor(private prismaService: PrismaService) { }

  findAll() {
    return `This action returns all roles`;
  }


  findOne(id: number) {
    return `This action returns a #${id} champion`;
  }
}
