// src/github/github.service.ts
import { Injectable, Req } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Request } from 'express';
import { Octokit } from '@octokit/rest';
import axios from 'axios';

@Injectable()
export class GithubService {
  constructor(private httpService: HttpService) {}

  async getRepos(accessToken: string): Promise<any[]> {
    // Initialize the Octokit client with the access token
    const octokit = new Octokit({
      auth: accessToken,
    });

    try {
      // Fetch repositories
      const response = await octokit.request('GET /user/repos');

      // Extract the names of the repositories and check for webhooks
      const reposWithWebhooks = await Promise.all(
        response.data.map(async (repo: any) => {
          try {
            const webhooks = await octokit.request(
              'GET /repos/{owner}/{repo}/hooks',
              {
                owner: repo.owner.login,
                repo: repo.name,
              }
            );

            return {
              name: repo.name,
              hasWebhook: webhooks.data.length > 0,
            };
          } catch (error) {
            console.error(
              `Error fetching webhooks for ${repo.name}:`,
              error.message
            );
            return {
              name: repo.name,
              hasWebhook: false,
            };
          }
        })
      );

      return reposWithWebhooks;
    } catch (error) {
      console.error('Error fetching repositories:', error.message);
      return [];
    }
  }

  async getSolFiles(accessToken: string, repoName: string) {
    console.log(accessToken);
    const octokit = new Octokit({ auth: accessToken });

    try {
      const reposResponse = await octokit.repos.listForAuthenticatedUser({});
      const repos = reposResponse.data;

      const repo = repos.find((r) => r.name === repoName);

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

      const solFiles = files.filter(
        (f) => f.type === 'file' && f.name.endsWith('.sol')
      );

      if (solFiles.length === 0) {
        throw new Error(
          `No .sol files were found in the "${repoName}" repository.`
        );
      }

      return solFiles;
    } catch (error) {
      throw new Error(`Error fetching .sol files: ${error.message}`);
    }
  }

  async addWebhook(accessToken: string, repoName: string) {
    const apiUrl = `https://api.github.com/repos/${repoName}/hooks`;
    const headers = {
      Authorization: `token ${accessToken}`,
      Accept: 'application/vnd.github+json',
    };

    const webhookConfig = {
      url: ' https://2902-2a02-a210-2b45-5200-2dbd-ee44-1e75-c796.ngrok-free.app/webhook/github-events', //Create a NGROK tunnel and replace this with your ngrok URL
      content_type: 'json',
    };

    const requestBody = {
      name: 'web',
      active: true,
      events: ['push'],
      config: webhookConfig,
    };

    try {
      const response = await this.httpService
        .post(apiUrl, requestBody, { headers })
        .toPromise();
      return response!.data;
    } catch (error) {
      console.error('Error adding webhook:', error);
      throw error;
    }
  }
}
