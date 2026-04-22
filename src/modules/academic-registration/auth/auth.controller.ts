import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import UserRegistrationDto, { UserLoginDto } from './dto/auth.dto';

@Controller('academic-registration/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.authService.getHello();
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
