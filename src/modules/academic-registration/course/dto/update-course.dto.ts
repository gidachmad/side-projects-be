import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class UpdateCourseDto {
  @ApiProperty({
    example: 'Introduction to Computer Science',
    description: 'The name of the course',
  })
  @IsOptional()
  @IsString()
  name!: string;

  @ApiProperty({
    example: 'CS101',
    description: 'The code of the course',
  })
  @IsOptional()
  @IsString()
  code!: string;

  @ApiProperty({
    example: 10,
    description: 'The number of available seats for the course',
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  stock!: number;
}
