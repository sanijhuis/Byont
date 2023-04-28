// jwt.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

export function jwtMiddleware(jwtService: JwtService) {
  return (req: Request, res: Response, next: NextFunction) => {
    const jwtToken = req.signedCookies.JWT;
    if (jwtToken) {
      try {
        const payload = jwtService.decode(jwtToken) as any;
        req['customUser'] = payload;
      } catch (error) {
        // Error handling if needed
      }
    }
    next();
  };
}
