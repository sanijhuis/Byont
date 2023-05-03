// src/github/github.module.ts
import { Module } from '@nestjs/common';
import { GithubController } from '../controllers/github.controller';
import { GithubService } from '../services/github.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/services/users.service';

@Module({
  imports: [],
  controllers: [GithubController],
  providers: [GithubService, UsersService],
})
export class GithubModule {}
