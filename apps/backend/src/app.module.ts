import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
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
import { GithubModule } from './modules/github.module';
import { jwtMiddleware } from './middleware/jwt.middleware';


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
    WebhookController,
    UsersController,
    AuthController,
  ],
  providers: [AppService, AuthService, JwtService, FileService],
})
export class AppModule implements NestModule {
  constructor(private readonly jwtService: JwtService) { }

  async onModuleInit() {
    const jwtMiddlewareInstance = jwtMiddleware(this.jwtService);
    await jwtMiddlewareInstance;
  }

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(jwtMiddleware(this.jwtService))
      .exclude({ path: 'auth', method: RequestMethod.ALL }) // Exclude the auth route from the middleware
      .forRoutes('*');
  }
}

