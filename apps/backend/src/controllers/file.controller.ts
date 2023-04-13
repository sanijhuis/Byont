import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as Docker from 'dockerode';
import { join } from 'path';
import { spawn } from 'child_process';

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
    const filename = file.filename;
    const filePath = join(__dirname, '..', 'uploads', filename);
    
    const command = `docker run -e FILENAME=${filename} mythril/myth`;
    const docker = spawn(command, { shell: true });

    docker.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    docker.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    docker.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });

    return { success: true };
  }
}