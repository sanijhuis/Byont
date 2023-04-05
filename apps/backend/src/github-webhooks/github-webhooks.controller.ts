import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ActivateDto } from './dto/activate.dto';
import { GithubWebhooksService } from './github-webhooks.service';

@Controller('github-webhooks')
export class GithubWebhooksController {}

export class WebhooksController {
  constructor(private readonly GithubWebhooksService: GithubWebhooksService) {}

  @Post('/activate')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(204)
  async activateWebhookForRepo(
    @Body() activateDto: ActivateDto,
  ): Promise<void> {
    const accessTokenSecret = process.env.YOUR_GITHUB_ACCESS_TOKEN;
    await this.GithubWebhooksService.activateWebhookForRepo(
      accessTokenSecret ? accessTokenSecret : '',
      activateDto,
    );
  }

  @Post('push')
  async handlePushEvent(@Body() body: any) {
    const {
      repository: {
        owner: { login: owner },
        name: repo,
      },
    } = body;
    await this.GithubWebhooksService.handlePushEvent(owner, repo);
  }

  // @Delete(':owner/:repo/:webhookId')
  // async deleteWebhook(
  //   @Param('owner') owner: string,
  //   @Param('repo') repo: string,
  //   @Param('webhookId') webhookId: string,
  // ) {
  //   const accessToken = 'YOUR_GITHUB_ACCESS_TOKEN'; // replace with a real access token
  //   return this.webhooksService.deleteWebhook(
  //     owner,
  //     repo,
  //     webhookId,
  //     accessToken,
  //   );
  // }
}
