import {
  Controller,
  Headers,
  HttpException,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { WebhookService } from 'src/services/webhook.service';

@Controller('webhook')
export class WebhookController {
  constructor(private webhookService: WebhookService) { }

  @Post('github-events')
  async handleGithubEvent(@Headers('x-github-event') event: string, @Req() req: Request) {
    const payload = req.body;

    if (!event) {
      throw new HttpException('Event header missing', HttpStatus.BAD_REQUEST);
    }

    switch (event) {
      case 'push':
        this.webhookService.handlePushEvent(payload);
        break;

      case 'ping':
        this.webhookService.handlePingEvent();
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
