import { Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { User } from 'src/types/user.type';

@Injectable()
export class UsersService {
  private prisma: PrismaClient;
  private readonly logger = new Logger();
  constructor() {
    this.prisma = new PrismaClient();
  }

  async findOrCreate(user: User) {
    console.log(user);
    const { githubAccessToken, email, username } = user;
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });
    if (existingUser) {
      return true;
    } else {
      const newUser = await this.prisma.user.create({
        data: {
          githubAccessToken,
          email,
          username,
        },
      });
      return newUser;
    }
  }

  async findbyEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }

  async getAllUsers() {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async getAccessToken(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user ? user.githubAccessToken : null;
  }

  async updateGithubAccessToken(email: string, githubAccessToken: string) {
    const user = await this.prisma.user.update({
      where: {
        email,
      },
      data: {
        githubAccessToken,
      },
    });
    return user;
  }

  async findIdByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user ? user.id : null;
  }
}
