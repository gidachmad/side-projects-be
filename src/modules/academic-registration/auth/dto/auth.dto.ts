/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEnum, IsString, MaxLength, MinLength } from "class-validator";
import { Role } from "generated/prisma/client";

export default class UserRegistrationDto {
  @ApiProperty({
    example: 'asep',
    description: 'The name of the user',
  })
  @IsString()
  @Transform(({ value }) => value.trim())
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
  @IsEnum(Role)
  role!: Role;
} 

export class UserLoginDto {
  @ApiProperty({
    example: 'asep',
    description: 'The name of the user',
  })
  @IsString()
  @Transform(({ value }) => value.trim())
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

