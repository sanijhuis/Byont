import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { RepoService } from 'src/services/repo.service';
import { SharedModule } from './shared.module';

@Module({
  providers: [RepoService],
  imports: [SharedModule],
  exports: [RepoService],
})
export class RepoModule {}
