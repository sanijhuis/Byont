import { Controller, Post, Body } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
    private prisma: PrismaClient;

    constructor(private readonly userService: UsersService) {
        this.prisma = new PrismaClient();
    }


}
