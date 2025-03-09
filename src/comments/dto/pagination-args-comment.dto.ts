import { IsInt, IsNotEmpty, IsOptional, IsPositive } from 'class-validator';
import { Transform } from 'class-transformer';

export class PaginationArgsCommentDto {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @Transform(({ value }) => parseInt(value, 10))
  taskId: number;

  @IsOptional()
  @IsInt()
  @Transform(({ value }) => (value ? parseInt(value, 10) : 0))
  skip?: number = 0;
}
