import { Injectable, Logger } from '@nestjs/common';
import { FileService } from './file.service';
import { GithubService } from './github.service';
import { PrismaService } from 'prisma/prisma.service';
import { UsersService } from './users.service';
import { RepoService } from './repo.service';

type Payload = any;

@Injectable()
export class WebhookService {
  private readonly logger = new Logger(WebhookService.name);
  prisma: any;

  constructor(
    private readonly githubService: GithubService,
    private readonly fileService: FileService,
    private readonly usersService: UsersService,
    private readonly repoService: RepoService
  ) {}

  async handleEvent(payload: any, eventType: string) {
    this.logger.log(`${eventType} event received:`);
    // Extract necessary information from the payload
    const user = {
      username: payload.sender.login,
      //email: payload.repository.owner.email,
    };
    console.log('payload', payload);
    const repoName = payload.repository.name;
    const userEmail = await this.usersService.findEmailByUsername(
      user.username
    );
    const accessToken = await this.usersService.getAccessToken(user.username);

    // Call getSolFiles from GithubService
    const solFiles = await this.githubService.downloadSolFiles(
      user.username,
      repoName,
      accessToken
    );

    // Get user id
    let userId;

    if (userEmail !== null) {
      userId = await this.usersService.findIdByEmail(userEmail);
    }

    // Get repo id
    const repoId = await this.repoService.findRepoByNameAndUserId(
      repoName,
      userId
    );

    // Call analyzeSlither from FileService
    const scanResult = await this.prisma.scanResult.create({
      data: {
        repo: {
          connect: {
            id: repoId, // connect to the Repo based on `repoId`.
          },
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    const dataScanResultMythril = await this.fileService.analyzeMythril(
      repoName
    );
    // const dataScanResultSlither = await this.fileService.analyzeSlither(repoName, userEmail, scanResult.id);
    // const dataScanResultChatgpt = await this.fileService.analyzeChatgpt(repoName, userEmail, scanResult.id);

    const dataScanResultSlither = { slither: 'output' };
    const dataScanResultChatgpt = { chatgpt: 'output' };

    const scanResults: Record<string, any> = {
      ...dataScanResultMythril,
      ...dataScanResultSlither,
      ...dataScanResultChatgpt,
    };

    for (const [filename, scanData] of Object.entries(scanResults)) {
      await this.prisma.outputs.create({
        data: {
          filename,
          slither: scanData.slither,
          mythril: scanData.mythril,
          chatgpt: scanData.chatgpt,
          scanResult: {
            connect: {
              id: scanResult.id,
            },
          },
        },
      });
    }
  } // this is the closing brace for handleEvent function

  async handlePushEvent(payload: Payload): Promise<void> {
    await this.handleEvent(payload, 'Push');
  }

  async handlePingEvent(payload: Payload): Promise<void> {
    await this.handleEvent(payload, 'Ping');
  }
} // this is the closing brace for the class
