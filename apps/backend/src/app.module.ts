import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './controllers/auth.controller';
import { AuthModule } from './modules/auth.module';
import { AuthService } from './services/auth.service';
import { UsersController } from './controllers/user.controller';
import { WebhookController } from './controllers/webhook.controller';
import { UserModule } from './modules/user.module';
import { FileModule } from './modules/file.module';
import { WebhookModule } from './modules/webhook.module';
import { FileService } from './services/file.service';


@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, UserModule, FileModule, WebhookModule],
  controllers: [AppController, WebhookController, UsersController, AuthController],
  providers: [AppService, AuthService, JwtService, FileService],
})
export class AppModule { }
