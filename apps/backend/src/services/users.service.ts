import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';

@Injectable()
export class UsersService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async findOrCreate(user: { email: string, id: number }) {
        console.log('User: ', user);
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
