import { Injectable, Logger } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';

@Injectable()
export class UsersService {
    private prisma: PrismaClient;
    private readonly logger = new Logger()
    constructor() {
        this.prisma = new PrismaClient();
    }

    async findOrCreate(user: { email: string, id: number }) {
        this.logger.log('User: ', user);
        if (user.email == undefined) {
            return false;
        }
        let existingUser = await this.prisma.user.findUnique({
            where: {
                githubId: user.id
            },
        });

        if (!existingUser) {
            existingUser = await this.prisma.user.create({
                data: {
                    githubId: user.id,
                    email: user.email
                },
            });
        }

        return existingUser;
    }
}
