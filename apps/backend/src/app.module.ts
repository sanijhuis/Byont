import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { UsersController } from './controllers/user.controller';
import { WebhookController } from './controllers/webhooks/webhook.controller';
import { UserModule } from './modules/user.module';
import { UsersService } from './services/users.service';


@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, UserModule],
  controllers: [AppController, WebhookController, UsersController, AuthController],
  providers: [AppService, UsersService, AuthService, JwtService],
})
export class AppModule { }
