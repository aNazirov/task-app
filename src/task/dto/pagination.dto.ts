import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Max, Min } from 'class-validator';
import { TransformToNumber } from 'src/utils/transform.util';

export class PaginationDto {
  @TransformToNumber()
  @IsNumber()
  @ApiProperty()
  skip: number;

  @TransformToNumber()
  @IsNumber()
  @Max(50)
  @Min(1)
  @ApiProperty({ minimum: 1, maximum: 50 })
  take: number;
}
