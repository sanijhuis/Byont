import { Injectable, Logger } from '@nestjs/common';
import { FileService } from './file.service';
import { GithubService } from './github.service';
import { PrismaService } from 'prisma/prisma.service';
import { UsersService } from './users.service';

@Injectable()
export class WebhookService {
  private readonly logger = new Logger(WebhookService.name);
  constructor(private readonly githubService: GithubService,
    private readonly fileService: FileService, private readonly usersService: UsersService) { }

  async handlePushEvent(payload: any) {
    this.logger.log('Push event received:');

    // Extract necessary information from the payload
    const user = {
      username: payload.sender.login,
      email: payload.repository.owner.email,
    };
    console.log(user);
    const repoName = payload.repository.name;
    const accessToken = await this.usersService.getAccessToken(user.email);

    // Call getSolFiles from GithubService
    const solFiles = await this.githubService.downloadSolFiles(user.username, repoName, accessToken);

    // Call analyzeSlither from FileService
    await this.fileService.analyzeMythril(repoName, user.email);
  }

  handlePingEvent() {
    this.logger.log('Ping event received');
  }
}
