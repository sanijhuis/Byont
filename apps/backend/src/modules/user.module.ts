import { Module } from '@nestjs/common';
import { UsersController } from '../controllers/user.controller';
import { UsersService } from '../services/users.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
  exports: [UsersService],
})
export class UserModule {}
