/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEnum, IsString, MaxLength, MinLength } from "class-validator";
import { Role } from "@prisma/client";

export default class UserRegistrationDto {
  @ApiProperty({
    example: 'asep',
    description: 'The name of the user',
  })
  @Transform(({ value }) => value.trim())
  @IsString()
  name!: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
  })
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password!: string;

  @ApiProperty({
    example: 'USER',
    description: 'The role of the user, either USER or LECTURER',
    enum: Role,
  })
  @Transform(({ value }) => value.trim().toUpperCase())
  @IsEnum(Role)
  role!: Role;
} 

export class UserLoginDto {
  @ApiProperty({
    example: 'asep',
    description: 'The name of the user',
  })
  @Transform(({ value }) => value.trim())
  @IsString()
  name!: string;
  
  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
  })
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password!: string;
}

