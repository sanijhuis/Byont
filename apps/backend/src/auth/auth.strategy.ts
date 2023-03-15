import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-github';
import { ExtractJwt, Strategy as PassportJwtStrategy } from 'passport-jwt'



/**
 * Passport strategy that authenticates users using GitHub's OAuth 2.0 API.
 * The strategy requires a client ID and secret, and redirects the user to the
 * GitHub login page if they are not already authenticated.
 * If the user successfully authenticates, GitHub sends back an access token,
 * which is used to retrieve the user's profile information.
 */
@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {

  constructor(configService: ConfigService) {
    super({
      clientID: configService.get('GITHUB_CLIENT_ID'),
      clientSecret: configService.get('GITHUB_CLIENT_SECRET'),
      callbackURL: 'http://localhost:3000/auth/callback',
      scope: ['public_profile'],
    });
  }

  async validate(accessToken: string, _refreshToken: string, profile: Profile) {
    return profile;
  }
}

/**
 * Passport strategy that authenticates users using JSON Web Tokens (JWT).
 * The strategy requires a secret key that is used to verify the token's signature.
 * The token is usually included in the request headers as a bearer token.
 * If the token is valid, the user object is returned.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(PassportJwtStrategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    return { id: payload.sub, username: payload.username };
  }
}
