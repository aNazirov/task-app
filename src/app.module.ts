import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { PrismaModule } from './libs/prisma';

@Module({
  imports: [PrismaModule, TaskModule],
})
export class AppModule {}
