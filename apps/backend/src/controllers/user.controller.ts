import { Controller, Post, Body } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Controller('users')
export class UsersController {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    @Post()
    async createUser(@Body() data: { email: string, password: string }) {
        const user = await this.prisma.user.create({ data });
        return user;
    }
}
