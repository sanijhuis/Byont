import { Injectable, Logger } from '@nestjs/common';
import { FileService } from './file.service';
import { GithubService } from './github.service';
import { PrismaService } from 'prisma/prisma.service';
import { UsersService } from './users.service';

@Injectable()
export class WebhookService {
  private readonly logger = new Logger(WebhookService.name);

  constructor(
    private readonly githubService: GithubService,
    private readonly fileService: FileService,
    private readonly usersService: UsersService
  ) { }

  async handleEvent(payload: any, eventType: string) {
    this.logger.log(`${eventType} event received:`);
    // Extract necessary information from the payload
    const user = {
      username: payload.sender.login,
      //email: payload.repository.owner.email,
    };
    console.log('payload', payload);
    const repoName = payload.repository.name;
    const userEmail = await this.usersService.findEmailByUsername(user.username);
    const accessToken = await this.usersService.getAccessToken(user.username);

    // Call getSolFiles from GithubService
    const solFiles = await this.githubService.downloadSolFiles(user.username, repoName, accessToken);

    // Call analyzeSlither from FileService
    await this.fileService.analyzeMythril(repoName, userEmail);
  }

  async handlePushEvent(payload: any) {
    this.handleEvent(payload, 'Push');
  }

  async handlePingEvent(payload: any) {
    this.handleEvent(payload, 'Ping');
  }
}
