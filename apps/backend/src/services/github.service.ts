// src/github/github.service.ts
import { Injectable, Req } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Request } from 'express';
import { Octokit } from '@octokit/rest';
import axios from 'axios';

@Injectable()
export class GithubService {
    constructor(private httpService: HttpService) { }

    async getAllRepos(accessToken: string): Promise<string[]> {
        const url = 'https://api.github.com/user/repos';
        const headers = {
            'Authorization': `token ${accessToken}`,
            'Accept': 'application/vnd.github+json',
        };

        try {
            const response = await this.httpService.get(url, { headers }).toPromise();
            return response!.data.map((repo: any) => repo.name);
        } catch (error) {
            console.error(`Error getting repositories: ${error.message}`);
            return [];
        }
    }

    async getRepos(accessToken: string): Promise<string[]> {
        const response = await axios.get('https://api.github.com/user/repos', {
            headers: {
                Authorization: `token ${accessToken}`,
            },
        });

        // Extract the names of the repositories
        const repoNames = response.data.map((repo: any) => repo.name);

        return repoNames;
    }

    async getSolFiles(accessToken: string, repoName: string) {

        const octokit = new Octokit({ auth: accessToken });

        try {
            const reposResponse = await octokit.repos.listForAuthenticatedUser({
            });
            const repos = reposResponse.data;


            const repo = repos.find(r => r.name === repoName);

            if (!repo) {
                throw new Error(`Repository "${repoName}" not found.`);
            }

            const filesResponse = await octokit.repos.getContent({
                owner: repo.owner.login,
                repo: repo.name,
                path: '',
            });

            const files = filesResponse.data;

            if (!Array.isArray(files)) {
                throw new Error('Unexpected response format from GitHub API.');
            }

            const solFiles = files.filter(f => f.type === 'file' && f.name.endsWith('.sol'));

            if (solFiles.length === 0) {
                throw new Error(`No .sol files were found in the "${repoName}" repository.`);
            }

            return solFiles;
        } catch (error) {
            throw new Error(`Error fetching .sol files: ${error.message}`);
        }
    }
}