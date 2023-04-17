// src/github/github.module.ts
import { Module } from '@nestjs/common';
import { GithubController } from '../controllers/github.controller';
import { GithubService } from '../services/github.service';
import { HttpModule } from '@nestjs/axios';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports: [HttpModule],
    controllers: [GithubController],
    providers: [GithubService, JwtService],
})
export class GithubModule { }
