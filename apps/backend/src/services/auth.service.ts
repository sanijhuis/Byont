import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private readonly configService: ConfigService
    ) {
        const jwtSecret = this.configService.get('JWT_SECRET');
        console.log('JWT_SECRET:', jwtSecret);
    }

    async validateUserFromGithub(profile: any) {
        const { id, email, username } = profile;
        const user = await this.usersService.findOrCreate(profile);
        console.log('user has been found!', user);
        if (!user) {
            throw new Error('User not found or could not be created');
        }

        return { id, email, username };
    }

    async generateJwtToken(user: { id: number; username: string; email: string }) {
        const jwtSecret = this.configService.get('JWT_SECRET');
        console.log(jwtSecret);
        const payload = { sub: user.id, username: user.username, email: user.email };
        return this.jwtService.sign(payload, { secret: jwtSecret });
    }
}
