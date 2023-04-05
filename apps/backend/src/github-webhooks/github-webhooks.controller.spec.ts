import { Test, TestingModule } from '@nestjs/testing';
import { GithubWebhooksController } from './github-webhooks.controller';

describe('GithubWebhooksController', () => {
  let controller: GithubWebhooksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GithubWebhooksController],
    }).compile();

    controller = module.get<GithubWebhooksController>(GithubWebhooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
