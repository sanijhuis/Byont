import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Response,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { CreateWebhookDto } from 'src/DTO/create-webhook.dto';
import { JwtPayload } from 'src/decorators/jwt-payload.decorator';
import { UsersService } from 'src/services/users.service';
import { User } from 'src/types/user.type';
import { GithubService } from '../services/github.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('github')
export class GithubController {
  constructor(
    private readonly githubService: GithubService,
    private readonly jwtService: JwtService,
    private readonly userService: UsersService
  ) { }

  @Get('sol-files')
  async getSolFiles(@Req() req: Request) {
    const user = req['customUser'];
    const accessToken = await this.userService.getAccessToken(user.email);

    if (!accessToken) {
      throw new UnauthorizedException('GitHub access token is missing');
    }

    const repoName = 'webhooksrepo'; // Replace with the desired repository name
    return this.githubService.getSolFiles(accessToken, repoName);
  }

  @Get('repos')
  @UseGuards(AuthGuard('jwt'))
  async getRepos(@Req() req: Request): Promise<string[]> {
    const user = req['customUser'];
    const accessToken = await this.userService.getAccessToken(user.email);

    if (!accessToken) {
      throw new UnauthorizedException('GitHub access token is missing');
    }

    return await this.githubService.getRepos(accessToken);
  }

  @Post('add-webhook')
  @UseGuards(AuthGuard('jwt'))
  async createWebhook(
    @Req() req: Request,
    @Response() res: any,
    @Body() body: CreateWebhookDto
  ) {
    const repoName = body.repoName;
    const user: User = req['customUser'];
    const accessToken = await this.userService.getAccessToken(user.email);

    if (!user || !accessToken) {
      throw new UnauthorizedException(
        'User does not exist or GitHub access token is missing'
      );
    }

    try {
      const webhookData = await this.githubService.createWebhook(
        accessToken,
        user,
        repoName
      );
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
