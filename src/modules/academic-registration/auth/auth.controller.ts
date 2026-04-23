import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import UserRegistrationDto, { UserLoginDto } from './dto/auth.dto';
import { JwtAuthGuard } from 'src/modules/academic-registration/auth/guards/jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('academic-registration/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.authService.getHello();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user; // This will be populated by the JwtStrategy's validate method
    // return this.authService.getProfile();
  }

  @Post('register')
  register(@Body() userRegistrationDto: UserRegistrationDto) {
    return this.authService.register(userRegistrationDto);
  }

  @Post('login')
  login(@Body() userLoginDto: UserLoginDto) {
    return this.authService.login(userLoginDto);
  }
}
