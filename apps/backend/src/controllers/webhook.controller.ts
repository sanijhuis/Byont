import {
  Controller,
  Post,
  Headers,
  Body,
  Logger,
  HttpException,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { createHmac } from 'crypto';
import { Webhooks } from '@octokit/webhooks';
import { ConfigService } from '@nestjs/config';

interface WebhookBody {
  repository: {
    name: string;
  };
}

@Controller('webhook')
export class WebhookController {
  private readonly logger = new Logger();

  @Post('github-events')
  async handleGithubEvent(@Req() req: Request) {
    const event = req.headers['x-github-event'];
    const payload = req.body;

    if (!event) {
      throw new HttpException('Event header missing', HttpStatus.BAD_REQUEST);
    }

    switch (event) {
      case 'push':
        this.handlePushEvent(payload);
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
  
    console.log('Push event received:', payload);
  }

  @Post()
  handleWebhook(
    @Headers('x-github-event') event: string,
    @Headers('x-github-delivery') id: string,
    @Headers('x-hub-signature') signature: string,
    @Body() body: WebhookBody
  ): string {
    const secretStr = 'thisismylittlesecret';
    const webhooks = new Webhooks({
      secret: secretStr,
    });
    webhooks.on('push', () => {});
    // Generate a signature for the request body using the secret
    const hmac = createHmac('sha1', secretStr);
    const payload = JSON.stringify(body);
    const digest = 'sha1=' + hmac.update(payload).digest('hex');

    // Verify that the signature matches the value in the x-hub-signature header
    if (signature !== digest) {
      console.error('Invalid signature');
      return 'Invalid signature';
    }

    // Log the event type and repository name for debugging purposes
    this.logger.log(`Received ${event} event for ${body.repository.name}`);
    this.logger.log({ signature });
    this.logger.log({ digest });
    this.logger.log({ body });
    this.logger.log(id);

    // Return a 200 OK status code to confirm receipt of the webhook event
    return 'OK';
  }
}
