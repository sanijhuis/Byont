import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { AuthService } from './auth.service';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
    constructor(configService: ConfigService, private authService: AuthService) {
        super({
            clientID: configService.get('GITHUB_CLIENT_ID'),
            clientSecret: configService.get('GITHUB_CLIENT_SECRET'),
            callbackURL: 'http://localhost:3000/auth/callback',
            scope: ['public:profile'],
        });
    }

    async validate(accessToken: string, _refreshToken: string, profile: any) {
        console.log(profile);
        const email = profile._json.email;
        console.log(email);
        return this.authService.validateUserFromGithub({
            id: profile._json.id,
            email: profile._json.email,
        });
    }
}
