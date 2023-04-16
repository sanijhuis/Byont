// src/github/github.controller.ts
import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { GithubService } from '../services/github.service';

@Controller('github')
export class GithubController {
    constructor(private readonly githubService: GithubService) { }

    @Get('sol-files')
    async getSolFiles(@Req() request: Request) {
        const accessToken = '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';
        const repoName = 'webhooksrepo'; // Replace with the desired repository name
        return this.githubService.getSolFiles(accessToken, repoName);
    }

    @Get('repos')
    async getAllRepos(){
        
    }
}
