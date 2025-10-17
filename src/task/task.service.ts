import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { FindTasksDto } from './dto/find-tasks.dto';
import { Utils } from 'src/utils';
import { PrismaService } from 'src/libs/prisma';
import { Prisma, Task } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateTaskDto): Promise<Task> {
    try {
      const data: Prisma.TaskCreateInput = {
        title: dto.title,
        description: dto.description,
        status: dto.status,
        priority: dto.priority,
      };

      const createdTask = await this.prismaService.task.create({ data });

      return createdTask;
    } catch (error) {
      return Utils.ErrorHandler({ code: 500, error: error as Error });
    }
  }

  async findAll(dto: FindTasksDto): Promise<Task[]> {
    try {
      const orderBy: Prisma.TaskOrderByWithRelationInput = {};

      if (dto.sortBy && dto.sort) {
        orderBy[dto.sortBy] = dto.sort;
      }

      const tasks = await this.prismaService.task.findMany({
        orderBy,
        skip: dto.skip,
        take: dto.take,
      });

      return tasks;
    } catch (error) {
      return Utils.ErrorHandler({ code: 500, error: error as Error });
    }
  }

  async findOne(id: number) {
    try {
      const task = await this.prismaService.task.findUnique({
        where: { id },
      });

      if (!task) {
        return Utils.ErrorHandler({ code: 404, message: 'Task not found' });
      }

      return task;
    } catch (error) {
      return Utils.ErrorHandler({ code: 500, error: error as Error });
    }
  }

  async update(id: number, dto: UpdateTaskDto): Promise<Task> {
    try {
      const taskToBeUpdated = await this.prismaService.task.findUnique({
        where: { id },
      });

      if (!taskToBeUpdated) {
        return Utils.ErrorHandler({ code: 404, message: 'Task not found' });
      }

      const data: Prisma.TaskUpdateInput = {
        title: dto.title,
        status: dto.status,
        priority: dto.priority,
        description: dto.description,
      };

      const updatedTask = this.prismaService.task.update({
        where: { id: taskToBeUpdated.id },
        data,
      });

      return updatedTask;
    } catch (error) {
      return Utils.ErrorHandler({ code: 500, error: error as Error });
    }
  }

  async remove(id: number): Promise<Task> {
    try {
      const taskToBeDeleted = await this.prismaService.task.findUnique({
        where: { id },
      });

      if (!taskToBeDeleted) {
        return Utils.ErrorHandler({ code: 404, message: 'Task not found' });
      }

      await this.prismaService.task.delete({
        where: { id: taskToBeDeleted.id },
      });

      return taskToBeDeleted;
    } catch (error) {
      return Utils.ErrorHandler({ code: 500, error: error as Error });
    }
  }
}
