import { Injectable, Logger } from '@nestjs/common';
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
  private readonly logger = new Logger()
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    this.logger.log('Payload', payload);
    return { id: payload.sub, username: payload.username, email: payload.email };
  }
}