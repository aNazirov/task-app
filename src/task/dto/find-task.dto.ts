import { ApiProperty, PickType } from '@nestjs/swagger';
import { TaskDto } from './task.dto';
import { TransformToNumber } from 'src/utils/transform.util';
import { IsNumber } from 'class-validator';

export class FindTaskDto extends PickType(TaskDto, ['id']) {
  @TransformToNumber()
  @IsNumber()
  @ApiProperty()
  id: number;
}
