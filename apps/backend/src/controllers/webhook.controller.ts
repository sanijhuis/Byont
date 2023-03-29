import { Controller, Post, Headers, Body } from '@nestjs/common';
import { createHmac } from 'crypto';
import { Webhooks } from '@octokit/webhooks';
import { ConfigService } from '@nestjs/config';

interface WebhookBody {
    repository: {
        name: string;
    }
}

@Controller('webhook')
export class WebhookController {

    @Post()
    handleWebhook(
        @Headers('x-github-event') event: string,
        @Headers('x-github-delivery') id: string,
        @Headers('x-hub-signature') signature: string,
        @Body() body: WebhookBody,
    ): string {
        const secretStr = "thisismylittlesecret";
        const webhooks = new Webhooks({
            secret: secretStr,
        });
        webhooks.on('push', () => {
            console.log("dit word bereikt!")
        })
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
        console.log(`Received ${event} event for ${body.repository.name}`);
        console.log({ signature });
        console.log({ digest });
        console.log({ body });
        console.log(id);


        // Return a 200 OK status code to confirm receipt of the webhook event
        return 'OK';
    }
}


