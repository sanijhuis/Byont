import { Module } from '@nestjs/common';
import { UsersController } from '../controllers/user.controller';
import { UsersService } from '../services/users.service';
import { PrismaService } from '../../prisma/prisma.service';
import { SharedModule } from './shared.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [SharedModule],
  exports: [UsersService],
})
export class UserModule {}
