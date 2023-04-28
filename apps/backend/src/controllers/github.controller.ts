import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UnauthorizedException,
  Response,
} from '@nestjs/common';
import { Request } from 'express';
import { GithubService } from '../services/github.service';
import { JwtService } from '@nestjs/jwt';
import { Octokit } from '@octokit/rest';
import { JwtPayload } from 'src/decorators/jwt-payload.decorator';
import { User } from 'src/types/user.type';
import { CreateWebhookDto } from 'src/DTO/create-webhook.dto';
import { PrismaClient } from '@prisma/client';
import { UsersService } from 'src/services/users.service';

@Controller('github')
export class GithubController {
  constructor(
    private readonly githubService: GithubService,
    private readonly jwtService: JwtService,
    private readonly userService: UsersService
  ) {}

  @Get('sol-files')
  async getSolFiles(@Req() req: Request) {
    const jwtToken = req.signedCookies.JWT;

    if (!jwtToken) {
      throw new UnauthorizedException('JWT token is missing');
    }

    const payload = this.jwtService.decode(jwtToken) as any;
    const accessToken = await this.userService.getAccessToken(payload.email);

    if (!accessToken) {
      throw new UnauthorizedException('GitHub access token is missing');
    }

    const repoName = 'webhooksrepo'; // Replace with the desired repository name
    return this.githubService.getSolFiles(accessToken, repoName);
  }

  @Get('repos')
  async getRepos(@JwtPayload() payload: any): Promise<string[]> {
    console.log('payload', payload);
    if (!payload) {
      throw new UnauthorizedException('JWT token is missing');
    }

    const accessToken = await this.userService.getAccessToken(payload.email);

    if (!accessToken) {
      throw new UnauthorizedException('GitHub access token is missing');
    }

    return await this.githubService.getRepos(accessToken);
  }

  @Post('add-webhook')
  async createWebhook(@Req() req: Request, @Response() res: any, @Body() body: CreateWebhookDto) {
    const repoName = body.repoName;
    const user: User = req['customUser'];
    const accessToken = await this.userService.getAccessToken(user.email);

    if (!user || !accessToken) {
      throw new UnauthorizedException(
        'User does not exist or GitHub access token is missing'
      );
    }

    try {
      const webhookData = await this.githubService.createWebhook(accessToken, user, repoName); // Call the createWebhook method
      return res.status(201).json({
        data: webhookData,
        message: 'Webhook created successfully',
      });
    } catch (error) {
      console.log(error);
      throw new HttpException('Invalid JWT token', HttpStatus.UNAUTHORIZED);
    }
  }
}
