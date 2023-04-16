import { Response } from 'express';
import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Redirect,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Get('login')
  @UseGuards(AuthGuard('github'))
  githubLogin() {
    // Initiates the GitHub OAuth2 process
    //  Can be left empty
  }

  @Get('callback')
  @UseGuards(AuthGuard('github'))
  async authCallback(@Req() req, @Res({ passthrough: true }) res: Response) {
    const user = req.user;
    console.log(req.user.accessToken)

    console.log(user)
    if (!user) {
      throw new BadRequestException('User object is missing in the request');
    }
    const accessToken = await this.authService.generateJwtToken(user);

    // Set the JWT in an HTTP-only cookie
    res.cookie('access_token', accessToken, {
      httpOnly: false,
      secure: false, // Set to true only in production environment
      signed: false,
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

  //Temp function to test Guards
  @Get('protected')
  @UseGuards(AuthGuard('jwt'))
  async getProtectedData(@Req() req) {
    // Cookies that have not been signed
    console.log('Cookies: ', req.cookies);

    // Cookies that have been signed
    console.log('Signed Cookies: ', req.signedCookies);
    return { data: 'This is protected data' };
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    // Clear the JWT cookie
    res.cookie('access_token', '', {
      httpOnly: false,
      secure: false, // Set to true only in production environment
      signed: false,
      // sameSite: 'strict',
      maxAge: 0,
    });

    // Redirect to the home page or login page after logging out
    res.redirect('http://localhost:8080/');
  }
}
