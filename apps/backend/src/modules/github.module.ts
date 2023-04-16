// src/github/github.module.ts
import { Module } from '@nestjs/common';
import { GithubController } from '../controllers/github.controller';
import { GithubService } from '../services/github.service';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [HttpModule],
    controllers: [GithubController],
    providers: [GithubService],
})
export class GithubModule { }
