import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export const JwtPayload = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const jwtService = new JwtService({});
        const jwtToken = request.signedCookies.JWT;
        return jwtService.decode(jwtToken) as any;
    },
);
