import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { map } from 'rxjs/operators';
import { ActivateDto } from './dto/activate.dto';

@Injectable()
export class GithubWebhooksService {
  constructor(private readonly httpService: HttpService) {}

  /* 
  This method creates a webhook for the specified repository.
  */
  activateWebhookForRepo(
    accessToken: string,
    activateDto: ActivateDto,
  ): Promise<AxiosResponse> {
    const url = `https://api.github.com/repos/${activateDto.ownerName}/${activateDto.repoName}/hooks`;
    const webhookConfig = {
      name: 'web',
      active: true,
      events: ['push'],
      config: {
        url: 'http://localhost:4000/webhook/push',
      },
    };

    return this.httpService
      .post(url, webhookConfig, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/vnd.github+json',
        },
      })
      .toPromise();
  }

  /* 
  handlePushEvent() is called when a push event is received from GitHub.
  The event payload is passed as the body of the request.
  */
  async handlePushEvent(owner: string, repo: string) {
    // Get the latest commit details for the repository
    const response = await this.httpService
      .get(`https://api.github.com/repos/${owner}/${repo}/commits/master`)
      .toPromise();

    // Extract the list of changed files from the commit details
    const filesChanged = response.data.files.map((file) => file.filename);

    // Do something with the list of changed files, e.g. send a notification or trigger a build
    console.log('Files changed:', filesChanged);
  }

  // ------- Delete a webhook -------

  // async deleteWebhook(
  //   owner: string,
  //   repo: string,
  //   webhookId: string,
  //   accessToken: string,
  // ): Promise<void> {
  //   const headers = {
  //     Authorization: `Bearer ${accessToken}`,
  //     Accept: 'application/vnd.github.v3+json',
  //   };

  //   const url = `https://api.github.com/repos/${owner}/${repo}/hooks/${webhookId}`;

  //   try {
  //     const response = await this.httpService
  //       .delete(url, { headers })
  //       .toPromise();
  //     if (response.status !== 204) {
  //       throw new Error(`Failed to delete webhook: ${response.statusText}`);
  //     }
  //   } catch (err) {
  //     throw new Error(`Failed to delete webhook: ${err.message}`);
  //   }
  // }
}
