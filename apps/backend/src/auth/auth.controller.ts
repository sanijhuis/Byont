import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(private jwtService: JwtService) { }


  /**
 * Callback function for GitHub authentication.
 * Uses the AuthGuard to ensure that only authenticated requests are processed.
 * Retrieves the user object from the request and generates a JWT token using the user's id and username.
 * Returns the JWT token as a response.
 */
  @Get('callback')
  @UseGuards(AuthGuard('github'))
  async authCallback(@Req() req) {
    const user = req.user;
    const payload = { sub: user.id, username: user.username };
    return { accessToken: this.jwtService.sign(payload) };
  }

  @Get()
  @UseGuards(AuthGuard('github'))
  async login() {
    //
  }
}
