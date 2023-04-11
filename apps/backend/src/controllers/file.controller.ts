import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerStorageConfig } from '../utils/multer-storage-config';
import { Express } from 'express';
import { FileService } from '../services/file.service';
import { AuthGuard } from '@nestjs/passport';
import { memoryStorage } from 'multer';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  // @Post decorator is used to define the HTTP POST method for the 'upload' route
  // @UseInterceptors is used to apply the interceptor for handling file uploads
  // The FileInterceptor is configured with:
  //   - multerStorageConfig for defining the storage engine (disk storage) and filename generation
  //   - generates a random name for the file as of now for security reasons (could be changed later)
  //   - limits to set the maximum file size to 5 MB
  //   - fileFilter to check if the uploaded file has a .sol extension
  //     - If the file doesn't have a .sol extension, it returns a BadRequestException with an error message
  //     - Otherwise, it accepts the file for further processing (not implemented yet, should be the scanner)
  @Post('upload')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB
      },
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(sol)$/)) {
          return cb(
            new BadRequestException(
              'Only files with .sol extensions are allowed',
            ),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  // The 'uploadFile' method takes an uploaded file as a parameter (Express.Multer.File type)
  // The method returns a Promise with an object containing a 'message' property
  // If no file is provided, a BadRequestException is thrown with an error message
  // The fileService.processFile method is called to handle further processing of the uploaded file
  // If everything is successful, the method returns an object with a success message
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<{ message: string }> {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    //Validate file content
    const fileContent = file.buffer.toString();
    if (!this.isValidFileContent(fileContent)) {
      throw new BadRequestException(
        'Not a valid .sol file (file needs to begin with pragma solidity',
      );
    }
    await this.fileService.processFile(file);
    return { message: 'File uploaded successfully' };
  }

  // A method to validate the file content
  // Very simple check and should probably be replaced later on
  private isValidFileContent(fileContent: string): boolean {
    //  Check if the file content starts with "pragma solidity"
    return fileContent.startsWith('pragma solidity');
  }
}
