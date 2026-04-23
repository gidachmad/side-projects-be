import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, Min } from "class-validator";

export class CreateCourseDto {
  @ApiProperty({
    example: 'Introduction to Computer Science',
    description: 'The name of the course',
  })
  @IsString()
  name!: string;

  @ApiProperty({
    example: 'CS101',
    description: 'The code of the course',
  })
  @IsString()
  code!: string;

  @ApiProperty({
    example: 10,
    description: 'The number of available seats for the course',
  })
  @IsInt()
  @Min(0)
  stock!: number;
}
