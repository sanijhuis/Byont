import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './modules/auth.module';
import { AuthService } from './services/auth.service';
import { UsersController } from './controllers/user.controller';
import { WebhookController } from './controllers/webhook.controller';
import { UserModule } from './modules/user.module';
import { UsersService } from './services/users.service';
import { GithubWebhooksController } from './github-webhooks/github-webhooks.controller';
import { GithubWebhooksService } from './github-webhooks/github-webhooks.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, UserModule],
  controllers: [
    AppController,
    WebhookController,
    UsersController,
    AuthController,
    GithubWebhooksController,
  ],
  providers: [
    AppService,
    UsersService,
    AuthService,
    JwtService,
    GithubWebhooksService,
  ],
})
export class AppModule {}
