import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { diskStorage } from 'multer';
import { spawn } from 'child_process';


@Controller('analyze')
export class FileController {
  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const filename = file.originalname;
        cb(null, filename);
      },
    }),
  }))
  async analyzeFile(@UploadedFile() file: Express.Multer.File) {
    const filename = file.filename;
    const filePath = join(__dirname, '..', 'uploads', filename);
    const command = `docker run -w  apps/backend/uploads :/tmp mythril/myth analyze /tmp/${filename}`;
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