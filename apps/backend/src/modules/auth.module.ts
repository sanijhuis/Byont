// import { Module } from '@nestjs/common';
// import { GithubStrategy, JwtStrategy } from './auth.strategy';
// import { AuthController } from './auth.controller';
// import { JwtModule } from '@nestjs/jwt';
// import { ConfigService } from '@nestjs/config';
// import { AuthService } from './auth.service';
// import { UsersService } from 'src/services/users.service';

// @Module({
//   controllers: [AuthController],
//   imports: [
//     JwtModule.registerAsync({
//       useFactory: async (configService: ConfigService) => {
//         return {
//           signOptions: { expiresIn: '10h' },
//           secret: configService.get<string>('JWT_SECRET'),
//         };
//       },
//       inject: [ConfigService],
//     }),
//   ],
//   providers: [GithubStrategy, JwtStrategy, AuthService, UsersService],
// })
// export class AuthModule { }

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GithubStrategy } from '../auth/github.strategy';
import { AuthService } from '../services/auth.service';
import { UserModule } from './user.module';
import { AuthController } from '../auth/auth.controller';
import { JwtStrategy } from '../auth/jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secretOrPrivateKey: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  providers: [AuthService, GithubStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule { }
