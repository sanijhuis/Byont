import { Module } from '@nestjs/common';
import { FileService } from 'src/services/file.service';
import { FileController } from '../controllers/file.controller';
import { EmailModule } from './email.module';
import { RepoModule } from './repo.module';
import { SharedModule } from './shared.module';
import { UserModule } from './user.module';

@Module({
  controllers: [FileController],
  providers: [FileService],
  imports: [RepoModule, UserModule, EmailModule, SharedModule],
  exports: [FileService],
})
export class FileModule { }