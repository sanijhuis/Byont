import {
  Controller,
  HttpException,
  HttpStatus,
  Logger,
  Post,
  Req,
} from '@nestjs/common';

@Controller('webhook')
export class WebhookController {
  private readonly logger = new Logger();

  @Post('github-events')

  async handleGithubEvent(@Req() req: Request) {
    const event = req.headers['x-github-event'] as string;
    const payload = req.body;

    if (!event) {
      throw new HttpException('Event header missing', HttpStatus.BAD_REQUEST);
    }

    switch (event) {
      case 'push':
        this.handlePushEvent(payload);
        break;

      case 'ping':
        console.log('ping event received');
        break;

      default:
        throw new HttpException(
          'Unsupported event type',
          HttpStatus.BAD_REQUEST
        );
    }

    return { message: 'Event received' };
  }

  private handlePushEvent(payload: any) {
    console.log('Push event received:');
  }
}
