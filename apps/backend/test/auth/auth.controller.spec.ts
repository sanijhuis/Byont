import { AuthController } from '../../src/controllers/auth.controller';
import { AuthService } from '../../src/services/auth.service';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';
import { beforeEach } from 'node:test';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  let authGuard: AuthGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideGuard(authGuard('github'))
      .useValue({ canActivate: () => true }) // Mock AuthGuard
      .compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    authGuard = module.get(authGuard);
  });

  // ...existing tests

  describe('githubLogin', () => {
    it('should initiate GitHub OAuth2 process', async () => {
      const canActivateSpy = jest.spyOn(authGuard, 'canActivate');
      await controller.githubLogin();
      expect(canActivateSpy).toHaveBeenCalled();
    });
  });

  describe('authCallback', () => {
    it('should handle successful authentication callback', async () => {
      const generateJwtTokenSpy = jest
        .spyOn(authService, 'generateJwtToken')
        .mockResolvedValue('fake_jwt_token');
      const res = {
        cookie: jest.fn(),
        redirect: jest.fn(),
      };

      const user = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        githubAccessToken: 'gho_testAccessToken',
      };

      await controller.authCallback({ user }, res);
      expect(generateJwtTokenSpy).toHaveBeenCalledWith(user);
      expect(res.cookie).toHaveBeenCalledWith(
        'JWT',
        'fake_jwt_token',
        expect.any(Object)
      );
      expect(res.redirect).toHaveBeenCalledWith(
        'http://localhost:8080/dashboard'
      );
    });

    it('should handle failed authentication callback', async () => {
      await expect(controller.authCallback({ user: null }, {})).rejects.toThrow(
        BadRequestException
      );
    });
  });

  describe('login', () => {
    it('should start the login process', async () => {
      const canActivateSpy = jest.spyOn(authGuard, 'canActivate');
      await controller.login();
      expect(canActivateSpy).toHaveBeenCalled();
    });
  });

  describe('logout', () => {
    it('should clear JWT cookie and redirect', async () => {
      const res = {
        cookie: jest.fn(),
        redirect: jest.fn(),
      };

      await controller.logout(res);
      expect(res.cookie).toHaveBeenCalledWith('JWT', '', expect.any(Object));
      expect(res.redirect).toHaveBeenCalled();
    });
  });
});
