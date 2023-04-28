import { Module } from '@nestjs/common';
import { WebhookController } from '../controllers/webhook.controller';
import { WebhookService } from 'src/services/webhook.service';

@Module({
  controllers: [WebhookController],
  providers: [WebhookService],
})
export class WebhookModule { }
