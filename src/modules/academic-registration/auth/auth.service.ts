import { HttpException, Injectable } from '@nestjs/common';
import UserRegistrationDto from './dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserLoginDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  getHello(): string {
    return 'Hello from AuthService!';
  }

  async register(userRegistrationDto: UserRegistrationDto) {
    // check if user already exists in the database
    const user = await this.prisma.userAcademicRegistration.findFirst({
      where:{
        name: userRegistrationDto.name
      }
    })

    if (user) {
      throw new HttpException({
        message: 'User already exists',
      }, 400);
    }

    const hashedPassword = await bcrypt.hash(userRegistrationDto.password, 10);

    await this.prisma.userAcademicRegistration.create({
      data: {
        name: userRegistrationDto.name,
        password: hashedPassword,
        role: userRegistrationDto.role
      }
    })

    return {
      message: 'User registered successfully',
    };
  }

  async login(userLoginDto: UserLoginDto) {
    const user = await this.prisma.userAcademicRegistration.findFirst({
      where: {
        name: userLoginDto.name
      }
    });

    if (!user) {
      throw new HttpException({
        message: 'User not found',
      }, 404);
    }

    const isPasswordValid = await bcrypt.compare(userLoginDto.password, user.password);

    if (!isPasswordValid) {
      throw new HttpException({
        message: 'Invalid password',
      }, 400);
    }

    const payload = { sub: user.id, name: user.name, role: user.role };
    const token = await this.jwtService.signAsync(payload);
    
    return {
      message: 'User logged in successfully',
      data: {
        token: token,
        role: user.role
      }
    };
  }
}
