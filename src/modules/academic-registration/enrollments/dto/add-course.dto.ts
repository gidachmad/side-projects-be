import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class AddCourseDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  courseId!: number;
}