import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class WebhookService {
    private readonly logger = new Logger(WebhookService.name); 1

    handlePushEvent(payload: any) {
        this.logger.log('Push event received:');
    }

    handlePingEvent() {
        this.logger.log('Ping event received');
    }
}