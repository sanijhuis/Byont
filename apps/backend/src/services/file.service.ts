import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { Multer } from 'multer';

@Injectable()
export class FileService {
  async processFile(file: Express.Multer.File) {
    // Do something with the file, e.g., read its content, process it, etc.
    const content = fs.readFileSync(file.path, 'utf8');
    fs.rm(file.path, () => {
      console.log(content);
    });
  }
}
