import { Controller, Get, Req, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { GithubService } from '../services/github.service';
import { JwtService } from '@nestjs/jwt';

@Controller('github')
export class GithubController {
    constructor(
        private readonly githubService: GithubService,
        private readonly jwtService: JwtService,
    ) { }

    @Get('sol-files')
    async getSolFiles(@Req() req: Request) {
        const jwtToken = req.signedCookies.JWT;

        if (!jwtToken) {
            throw new UnauthorizedException('JWT token is missing');
        }

        const payload = this.jwtService.decode(jwtToken) as any;
        const accessToken = payload.githubAccessToken;

        if (!accessToken) {
            throw new UnauthorizedException('GitHub access token is missing');
        }

        const repoName = 'webhooksrepo'; // Replace with the desired repository name
        return this.githubService.getSolFiles(accessToken, repoName);
    }

    @Get('repos')
    async getRepos(@Req() req: Request): Promise<string[]> {
        const jwtToken = req.signedCookies.JWT;

        if (!jwtToken) {
            throw new UnauthorizedException('JWT token is missing');
        }

        const payload = this.jwtService.decode(jwtToken) as any;
        const accessToken = payload.githubAccessToken;

        if (!accessToken) {
            throw new UnauthorizedException('GitHub access token is missing');
        }

        return await this.githubService.getRepos(accessToken);
    }
}
