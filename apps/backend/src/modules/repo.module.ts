import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { RepoService } from 'src/services/repo.service';

@Module({
  imports: [],
  controllers: [],
  providers: [RepoService, PrismaService],
  exports: [RepoService],
})
export class RepoModule {}
