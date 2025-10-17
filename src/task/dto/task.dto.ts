import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus, TaskPriority } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class TaskDto {
  @IsNumber()
  @ApiProperty()
  id: number;

  @IsString()
  @ApiProperty()
  title: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ nullable: true })
  description: string;

  @IsEnum(TaskStatus)
  @ApiProperty({ enum: TaskStatus })
  status: TaskStatus;

  @IsEnum(TaskPriority)
  @ApiProperty({ enum: TaskPriority })
  priority: TaskPriority;

  @IsDateString()
  @ApiProperty()
  createdAt: string;

  @IsDateString()
  @ApiProperty()
  updatedAt: string;
}
