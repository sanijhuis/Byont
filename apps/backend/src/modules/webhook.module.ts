import { Module } from '@nestjs/common';
import { WebhookController } from '../controllers/webhook.controller';
import { WebhookService } from 'src/services/webhook.service';
import { FileService } from 'src/services/file.service';
import { GithubService } from 'src/services/github.service';
import { PrismaService } from 'prisma/prisma.service';
import { RepoService } from 'src/services/repo.service';
import { UsersService } from 'src/services/users.service';
import { FileModule } from './file.module';
import { GithubModule } from './github.module';
import { RepoModule } from './repo.module';
import { SharedModule } from './shared.module';
import { UserModule } from './user.module';
import { NftService } from 'src/services/nft.service';

@Module({
  controllers: [WebhookController],
  providers: [WebhookService, NftService],
  imports: [GithubModule, FileModule, UserModule, SharedModule, RepoModule],
  exports: [WebhookService],
})
export class WebhookModule { }
