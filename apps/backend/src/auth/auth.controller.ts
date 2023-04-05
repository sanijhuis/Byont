import { Controller, Get, Redirect, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('login')
  @UseGuards(AuthGuard('github'))
  githubLogin() {
    // Initiates the GitHub OAuth2 process
    //  Can be left empty
  }

  @Get('callback')
  @UseGuards(AuthGuard('github'))
  async authCallback(@Req() req) {
    const user = req.user;
    const accessToken = await this.authService.generateJwtToken(user);
    return { accessToken };
  }

  @Get()
  @UseGuards(AuthGuard('github'))
  async login() {
    //
  }

  //Temp function t otest Guards
  @Get('protected')
  @UseGuards(AuthGuard('jwt'))
  async getProtectedData(@Req() req) {
    return { data: 'This is protected data' };
  }
}
