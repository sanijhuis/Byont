// auth.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { INestApplication } from '@nestjs/common';
import { request } from 'express';
import { AppModule } from 'src/app.module';

// Create a mock AuthService
const authServiceMock = {
    generateJwtToken: jest.fn(),
};

describe('AppController (e2e)', () => {
    let app: INestApplication;
  
    beforeEach(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();
  
      app = moduleFixture.createNestApplication();
      await app.init();
    });
  
    it('accesses protected route with a valid JWT cookie', () => {
      const validJwt = 'your_valid_jwt_here'; // Replace with a valid JWT for testing purposes
  
      return request(app.getHttpServer())
        .get('/protected') // Replace with your protected route URL
        .set('Cookie', `access_token=${validJwt}`)
        .expect(200);
    });
  });

// Create a mock AuthGuard 
const mockAuthGuard = (name: string) => {
    return () => ({
        canActivate: () => true,
    });
};

describe('AuthController', () => {
    let controller: AuthController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                { provide: AuthService, useValue: authServiceMock },
            ],
        })
            .overrideGuard(AuthGuard('github'))
            .useValue(mockAuthGuard('github'))
            .overrideGuard(AuthGuard('jwt'))
            .useValue(mockAuthGuard('jwt'))
            .compile();

        controller = module.get<AuthController>(AuthController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

   
    it('should throw an error when user object is missing', async () => {
        const reqMock = {}; 
        const expectedErrorMessage = 'User object is missing in the request';

        authServiceMock.generateJwtToken.mockImplementation(() => {
            throw new Error(expectedErrorMessage);
        });

        try {
            await controller.authCallback(reqMock);
        } catch (error) {
            expect(error.message).toEqual(expectedErrorMessage);
        }
    });


    describe('authCallback', () => {
        it('should return access token', async () => {
            const reqMock = { user: { id: 1, username: 'test', email: 'test@example.com' } };
            const accessToken = 'mockAccessToken';

            authServiceMock.generateJwtToken.mockResolvedValue(accessToken);

            const result = await controller.authCallback(reqMock);

            expect(result).toEqual({ accessToken });
            expect(authServiceMock.generateJwtToken).toHaveBeenCalledWith(reqMock.user);
        });
    });

    describe('getProtectedData', () => {
        it('should return protected data', async () => {
            const reqMock = {};
            const result = await controller.getProtectedData(reqMock);

            expect(result).toEqual({ data: 'This is protected data' });
        });
    });
});
