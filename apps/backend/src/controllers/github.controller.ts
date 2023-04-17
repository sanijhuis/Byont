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
    async getRepos(@Req() req: any): Promise<string[]> {
        // Replace this line with the code that retrieves the access token from the session or JWT
        const accessToken = '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';
        return await this.githubService.getRepos(accessToken);
    }
}
