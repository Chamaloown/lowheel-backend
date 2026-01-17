import 'dotenv/config'

import { Controller } from '@nestjs/common';
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from './generated/prisma/client';

const connectionString = process.env.DATABASE_URL;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

@Controller()
export class AppController {
}
