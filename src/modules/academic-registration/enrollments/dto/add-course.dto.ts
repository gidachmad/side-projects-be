import { ApiProperty } from '@nestjs/swagger';

export class AddCourseDto {
  @ApiProperty({ example: 1 })
  courseId!: number;
}