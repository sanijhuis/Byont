import {
  Controller,
  Headers,
  HttpException,
  HttpStatus,
  Logger,
  Post,
  Req,
} from '@nestjs/common';
import { WebhookService } from 'src/services/webhook.service';

@Controller('webhook')
export class WebhookController {
  private readonly logger = new Logger(WebhookController.name);
  constructor(private webhookService: WebhookService) { }

  @Post('github-events')
  async handleGithubEvent(
    @Headers('x-github-event') event: string,
    @Req() req: Request
  ) {
    const payload = req.body;
    this.logger.log(`Payload: ${JSON.stringify(payload)}`);
    if (!event) {
      throw new HttpException('Event header missing', HttpStatus.BAD_REQUEST);
    }

    switch (event) {
      case 'push':
        await this.webhookService.handlePushEvent(payload);
        break;

      case 'ping':
        await this.webhookService.handlePingEvent(payload);
        break;

      default:
        throw new HttpException(
          'Unsupported event type',
          HttpStatus.BAD_REQUEST
        );
    }

    return { message: 'Event received' };
  }
}
