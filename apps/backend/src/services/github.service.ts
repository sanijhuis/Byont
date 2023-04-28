
import { Injectable } from '@nestjs/common';
import { Octokit } from '@octokit/rest';
import { User } from 'src/types/user.type';

@Injectable()
export class GithubService {
  constructor() { }

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
            url: 'https://bdfc-185-65-134-174.ngrok-free.app/webhook/github-events',
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
