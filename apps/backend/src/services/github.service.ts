import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Octokit } from '@octokit/rest';
import { PrismaClient, Repo } from '@prisma/client';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import { PrismaService } from 'prisma/prisma.service';
import { User } from 'src/types/user.type';
var appRoot = require('app-root-path');

@Injectable()
export class GithubService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService
  ) {
    this.prisma = new PrismaClient();
    this.configService = new ConfigService();
  }

  async getRepos(accessToken: string, userId: number): Promise<any[]> {
    const octokit = new Octokit({
      auth: accessToken,
    });

    try {
      const response = await octokit.request('GET /user/repos');

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

            let existingRepo = await this.prisma.repo.findUnique({
              where: {
                name_owner: {
                  name: repo.name,
                  owner: repo.owner.login,
                },
              },
            });

            if (!existingRepo) {
              existingRepo = await this.prisma.repo.create({
                data: {
                  user: { connect: { id: userId } },
                  name: repo.name,
                  owner: repo.owner.login,
                },
              });
            }

            const webhookUrl =
              this.configService.get('NGROK_URL') + '/webhook/github-events';
            const hasWebhook = webhooks.data.some(
              (webhook: any) => webhook.config.url === webhookUrl
            );

            return {
              ...existingRepo,
              hasWebhook,
            };
          } catch (error) {
            console.error(
              `Error fetching webhooks for ${repo.name}:`,
              error.message
            );
            return {
              name: repo.name,
              owner: repo.owner.login,
              hasWebhook: false,
            };
          }
        })
      );

      return reposWithWebhooks;
    } catch (error) {
      console.error('Error fetching repositories:', error.message);
      return [];
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async removeRepo(repo: Repo, accessToken: string): Promise<void> {
    const octokit = new Octokit({
      auth: accessToken,
    });

    try {
      await octokit.request('DELETE /repos/{owner}/{repo}', {
        owner: repo.owner,
        repo: repo.name,
      });
    } catch (error) {
      console.error(`Error removing repo ${repo.name}:`, error.message);
    }
  }

  async removeWebhook(repo: Repo, accessToken: string): Promise<void> {
    const octokit = new Octokit({
      auth: accessToken,
    });

    try {
      const webhooks = await octokit.request(
        'GET /repos/{owner}/{repo}/hooks',
        {
          owner: repo.owner,
          repo: repo.name,
        }
      );

      const webhookUrl =
        this.configService.get('NGROK_URL') + '/webhook/github-events';
      const webhook = webhooks.data.find(
        (webhook: any) => webhook.config.url === webhookUrl
      );

      if (webhook) {
        await octokit.request('DELETE /repos/{owner}/{repo}/hooks/{hook_id}', {
          owner: repo.owner,
          repo: repo.name,
          hook_id: webhook.id,
        });
      }
    } catch (error) {
      console.error(`Error removing webhook for ${repo.name}:`, error.message);
    }
  }

  async downloadSolFiles(
    owner: string,
    repo: string,
    accessToken
  ): Promise<void> {
    const octokit = new Octokit({ auth: accessToken });
    const response = await octokit.request(
      'GET /repos/{owner}/{repo}/contents',
      {
        owner,
        repo,
      }
    );
    const solFiles = await this.getSolFilesRecursive(octokit, owner, repo);

    //const solFiles = response.data.filter((file: { name: string }) => path.extname(file.name) === '.sol');

    const contractsBaseDir = path.join(
      appRoot.path,
      'apps',
      'backend',
      'src',
      'contracts'
    );
    const outputDir = path.join(contractsBaseDir, repo);

    // Ensure the 'contracts' and 'outputDir' folders exist
    if (!fs.existsSync(contractsBaseDir)) {
      fs.mkdirSync(contractsBaseDir);
    }
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    // Download and save .sol files
    for (const file of solFiles) {
      const { download_url, name } = file;
      const { data } = await axios.get(download_url, {
        responseType: 'arraybuffer',
      });
      const fileOutputPath = path.join(outputDir, name);
      fs.writeFileSync(fileOutputPath, data);
    }
  }

  async getSolFilesRecursive(
    octokit: Octokit,
    owner: string,
    repo: string,
    dirPath = ''
  ): Promise<any[]> {
    const response = await octokit.request(
      'GET /repos/{owner}/{repo}/contents/{path}',
      {
        owner,
        repo,
        path: dirPath,
      }
    );

    const solFiles: any[] = [];
    for (const item of response.data as any[]) {
      if (item.type === 'dir') {
        const dirFiles = await this.getSolFilesRecursive(
          octokit,
          owner,
          repo,
          item.path
        );
        solFiles.push(...dirFiles);
      } else if (path.extname(item.name) === '.sol') {
        solFiles.push(item);
      }
    }

    return solFiles;
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
            url: this.configService.get('NGROK_URL') + `/webhook/github-events`,
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

  async deleteWebhook(
    accessToken: string,
    user: User,
    repoName: string
  ): Promise<void> {
    const octokit = new Octokit({
      auth: accessToken,
    });

    try {
      const response = await octokit.request(
        'GET /repos/{owner}/{repo}/hooks',
        {
          owner: user.username,
          repo: repoName,
        }
      );

      const webhook = response.data.find(
        (hook: any) =>
          hook.config.url ===
          this.configService.get('NGROK_URL') + `/webhook/github-events`
      );

      if (webhook) {
        await octokit.request('DELETE /repos/{owner}/{repo}/hooks/{hook_id}', {
          owner: user.username,
          repo: repoName,
          hook_id: webhook.id,
        });
      }
    } catch (error) {
      console.error('Error deleting webhook:', error);
      throw error;
    }
  }
}
