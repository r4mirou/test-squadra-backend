import {
  INestApplication,
  Injectable,
  OnApplicationShutdown,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnApplicationShutdown
{
  async onApplicationShutdown() {
    await this.$disconnect();
  }

  async enableShutdownHooks(app: INestApplication) {
    app.enableShutdownHooks();
  }
}