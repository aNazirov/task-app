import { ApiProperty, PickType } from '@nestjs/swagger';
import { TaskDto } from './task.dto';
import { IsNumber } from 'class-validator';
import { TransformToNumber } from 'src/utils/transform.util';

export class DeleteTaskDto extends PickType(TaskDto, ['id']) {
  @TransformToNumber()
  @IsNumber()
  @ApiProperty()
  id: number;
}
