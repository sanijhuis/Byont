import { Injectable } from '@nestjs/common';
import { Octokit } from '@octokit/rest';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import { User } from 'src/types/user.type';
var appRoot = require('app-root-path');

@Injectable()
export class GithubService {
  constructor() {}

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

  async downloadSolFiles(owner: string, repo: string, accessToken): Promise<void> {
    const octokit = new Octokit({ auth: accessToken });
    const response = await octokit.request('GET /repos/{owner}/{repo}/contents', {
      owner,
      repo,
    });

   console.log(appRoot.path, 'approot')
    const solFiles = response.data.filter(
      (file: { name: string }) => path.extname(file.name) === '.sol'
    );
   
    const outputDir = path.join(appRoot.path,'apps', 'backend', 'src', 'contracts');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }
    console.log(outputDir, 'outputdir');

    for (const file of solFiles) {
      const { download_url, name } = file;
      const { data } = await axios.get(download_url, { responseType: 'arraybuffer' });
      fs.writeFileSync(path.join(outputDir, name), data);
      console.log(`Downloaded ${name}`);
    }
  }

  async createWebhook(
    accessToken: string,
    user: User,
    repoName: string
  ): Promise<any> {
    const octokit = new Octokit({
      auth: accessToken,
    });

    try {
      const response = await octokit.request(
        'POST /repos/{owner}/{repo}/hooks',
        {
          owner: user.username,
          repo: repoName,
          name: 'web',
          active: true,
          events: ['push', 'pull_request'],
          config: {
            url: 'https://88ac-2a02-a210-2b45-5200-a4b3-f17-3db-f6e3.ngrok-free.app/webhook/github-events',
            content_type: 'json',
            insecure_ssl: '0',
          },
          headers: {
            accept: 'application/vnd.github+json',
          },
        }
      );

      if (response.status === 201) {
        console.log('Webhook created successfully:');
        return response.data;
      } else {
        console.log('Error creating webhook:', response);
      }
    } catch (error) {
      console.error('Error creating webhook:', error);
      throw error;
    }
  }
}
