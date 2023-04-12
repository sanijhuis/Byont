import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as Docker from 'dockerode';

@Controller('file')
export class FileController {
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB
      },
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename = file.originalname;
          cb(null, filename);
        },
      }),
    }),
  )
  async analyzeFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file.filename);

    const docker = new Docker();
    const container = await docker.createContainer({
      Image: 'mythril/myth',
      Cmd: ['analyze', `/mnt/${file.filename}`],
      HostConfig: {
        Binds: [`${__dirname}/uploads:/mnt`],
      },
    });
    await container.start();
    const logs = await container.logs({
      follow: true,
      stdout: true,
      stderr: true,
    });

    console.log(logs);

    await container.remove({ force: true });
  }
}
