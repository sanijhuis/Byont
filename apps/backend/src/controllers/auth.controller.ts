import { Response } from 'express';
import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private configService: ConfigService) { }

  @Get('login')
  @UseGuards(AuthGuard('github'))
  githubLogin() {
    // Initiates the GitHub OAuth2 process
    // Can be left empty
  }

  @Get('callback')
  @UseGuards(AuthGuard('github'))
  async authCallback(@Req() req, @Res({ passthrough: true }) res: Response) {
    const user = req.user;

    if (!user) {
      throw new BadRequestException('User object is missing in the request');
    }
    const accessToken = await this.authService.generateJwtToken({
      id: user.id,
      username: user.username,
      email: user.email,
      githubAccessToken: user.githubAccessToken
    });

    // Set the JWT in an HTTP-only cookie
    res.cookie('JWT', accessToken, {
      httpOnly: true,
      secure: false, // Set to true only in production environment
      signed: true,
      // sameSite: 'strict',
      maxAge: 60 * 60 * 1000,
    });
    res.redirect('http://localhost:8080/dashboard');
  }

  @Get()
  @UseGuards(AuthGuard('github'))
  async login() {
    //
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    // Clear the JWT cookie
    res.cookie('JWT', '', {
      httpOnly: true,
      secure: false, // Set to true only in production environment
      signed: true,
      // sameSite: 'strict',
      maxAge: 0,
    });

    res.redirect(this.configService.get('FRONTEND_URL')!);
  }
}
