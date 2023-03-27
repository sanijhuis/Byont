import { Controller, Post, Body } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Controller('users')
export class UsersController {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async sampleCode() {
        // Create a new user
        const user = await this.prisma.user.create({
            data: {
                email: 'example@email.com',
                password: 'password'
            }
        })

        // Create a new repo for the user
        const repo = await this.prisma.repo.create({
            data: {
                userId: user.id
            }
        })

        // Get all repos for a user
        const userWithRepos = await this.prisma.user.findUnique({
            where: {
                id: user.id
            },
            include: {
                repos: true
            }
        })

    }

    @Post()
    async createUser(@Body() data: { email: string, password: string }) {
        const user = await this.prisma.user.create({ data });
        return user;
    }


}
