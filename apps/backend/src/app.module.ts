import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { jwtMiddleware } from './middleware/jwt.middleware';
import { AuthModule } from './modules/auth.module';
import { FileModule } from './modules/file.module';
import { GithubModule } from './modules/github.module';
import { UserModule } from './modules/user.module';
import { WebhookModule } from './modules/webhook.module';
import { FileService } from './services/file.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    FileModule,
    WebhookModule,
    GithubModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [AppService, JwtService, FileService],
})
export class AppModule implements NestModule {
  constructor(private readonly jwtService: JwtService) { }

  async onModuleInit() {
    const jwtMiddlewareInstance = jwtMiddleware(this.jwtService);
    jwtMiddlewareInstance;
  }

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(jwtMiddleware(this.jwtService))
      .exclude({ path: 'auth', method: RequestMethod.ALL }) // Exclude the auth route from the middleware
      .forRoutes('*');
  }
}
