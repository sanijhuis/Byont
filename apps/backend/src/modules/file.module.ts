import { Module } from '@nestjs/common';
import { FileService } from 'src/services/file.service';
import { FileController } from '../controllers/file.controller';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { RepoService } from 'src/services/repo.service';
import { UsersService } from 'src/services/users.service';

@Module({
  controllers: [FileController],
  providers: [FileService, PrismaService, RepoService, UsersService],
})
export class FileModule { }
