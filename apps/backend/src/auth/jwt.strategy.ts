import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt'

/**
 * Passport strategy that authenticates users using JSON Web Tokens (JWT).
 * The strategy requires a secret key that is used to verify the token's signature.
 * The token is usually included in the request headers as a bearer token.
 * If the token is valid, the user object is returned.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          const token = req?.signedCookies?.JWT;
          return token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    if (!payload.exp) {
      throw new UnauthorizedException('Token without expiration is not allowed');
    }
    return { id: payload.sub, username: payload.username, email: payload.email, githubAccessToken: payload.githubAccessToken };
  }
}