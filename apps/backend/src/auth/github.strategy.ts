import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { AuthService } from '../services/auth.service';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  private readonly logger = new Logger();
  constructor(configService: ConfigService, private authService: AuthService) {
    super({
      clientID: configService.get('GITHUB_CLIENT_ID'),
      clientSecret: configService.get('GITHUB_CLIENT_SECRET'),
      callbackURL: 'http://localhost:4000/auth/callback',
      scope: ['public:profile'],
    });
  }

  async validate(accessToken: string, _refreshToken: string, profile: any) {
    this.logger.log('Profile', profile);
    const email = profile._json.email;
    this.logger.log('Email', email);
    return this.authService.validateUserFromGithub({
      id: profile._json.id,
      email: profile._json.email,
    });
  }
}
