import {
  Injectable,
  Logger,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnApplicationShutdown
{
  private readonly logger: Logger = new Logger(PrismaService.name);

  constructor() {
    let args: Prisma.PrismaClientOptions;

    const environment = process.env.ENV;

    if (environment === 'production') {
      args = {
        log: ['error', 'info'],
        errorFormat: 'pretty',
      };
    } else {
      args = {
        log: ['error', 'info', 'query', 'warn'],
        errorFormat: 'pretty',
      };
    }

    super(args);
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onApplicationShutdown(): Promise<void> {
    this.logger.log(`Disconnecting Prisma...`);

    await this.$disconnect();
  }
}
