import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TaskDto } from './dto/task.dto';
import { FindTaskDto } from './dto/find-task.dto';
import { DeleteTaskDto } from './dto/delete-task.dto';
import { FindTasksDto } from './dto/find-tasks.dto';
import { plainToInstance } from 'class-transformer';

@Controller('tasks')
@ApiTags('Task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiResponse({ status: 201, type: TaskDto })
  async create(@Body() createTaskDto: CreateTaskDto) {
    const task = await this.taskService.create(createTaskDto);
    return plainToInstance(TaskDto, task);
  }

  @Get()
  @ApiResponse({ status: 200, type: TaskDto, isArray: true })
  async findAll(@Query() query: FindTasksDto) {
    const tasks = await this.taskService.findAll(query);
    return tasks.map((task) => plainToInstance(TaskDto, task));
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: TaskDto })
  async findOne(@Param() params: FindTaskDto) {
    const task = await this.taskService.findOne(params.id);
    return plainToInstance(TaskDto, task);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, type: TaskDto })
  async update(
    @Param() params: FindTaskDto,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    const task = await this.taskService.update(params.id, updateTaskDto);
    return plainToInstance(TaskDto, task);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, type: TaskDto })
  async remove(@Param() params: DeleteTaskDto) {
    const task = await this.taskService.remove(params.id);
    return plainToInstance(TaskDto, task);
  }
}
