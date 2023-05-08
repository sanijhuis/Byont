import { Module } from '@nestjs/common';
import { WebhookController } from '../controllers/webhook.controller';
import { WebhookService } from 'src/services/webhook.service';
import { FileService } from 'src/services/file.service';
import { GithubService } from 'src/services/github.service';
import { PrismaService } from 'prisma/prisma.service';
import { RepoService } from 'src/services/repo.service';
import { UsersService } from 'src/services/users.service';

@Module({
  controllers: [WebhookController],
  providers: [WebhookService, GithubService, FileService, PrismaService, RepoService, UsersService],
  exports: [WebhookService],
  imports: []
})
export class WebhookModule { }
