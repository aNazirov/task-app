import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger';
import { TaskDto } from './task.dto';
import { PaginationDto } from './pagination.dto';
import { IsEnum, IsOptional } from 'class-validator';

export class FindTasksDto extends IntersectionType(
  PickType(TaskDto, []),
  PaginationDto,
) {
  @IsOptional()
  @IsEnum(['createdAt', 'priority'])
  @ApiProperty({ enum: ['createdAt', 'priority'], nullable: true })
  sortBy?: 'createdAt' | 'priority';

  @IsOptional()
  @IsEnum(['asc', 'desc'])
  @ApiProperty({ enum: ['asc', 'desc'], nullable: true })
  sort?: 'asc' | 'desc';
}
