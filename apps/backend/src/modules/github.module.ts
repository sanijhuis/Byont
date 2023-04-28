// src/github/github.module.ts
import { Module } from '@nestjs/common';
import { GithubController } from '../controllers/github.controller';
import { GithubService } from '../services/github.service';
import { HttpModule } from '@nestjs/axios';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/services/users.service';

@Module({
  imports: [HttpModule],
  controllers: [GithubController],
  providers: [GithubService, JwtService, UsersService],
})
export class GithubModule {}
