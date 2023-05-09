import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import multer, { diskStorage, memoryStorage } from 'multer';
import { FileService } from 'src/services/file.service';
import { parseOutput } from 'src/utils/output-parser';
import Multer from 'multer';
@Controller('file')
export class FileController {
  constructor(private fileService: FileService) {}

  @Get('analyze-slither/:repoName')
  async analyzeSlither(
    @Param('repoName') repoName: string,
    @Req() req: Request
  ) {
    const user = req['customUser'];
    //Temporary for testing, this will be replaced with the properties of the user objects
    const tempEmail = 'meesvanberkel120@hotmail.com';
    return this.fileService.analyzeSlither(repoName, user.email);
  }

  @Get('analyze-mythril/:repoName')
  async analyzeMythril(
    @Param('repoName') repoName: string,
    @Req() req: Request
  ) {
    const user = req['customUser'];
    //Temporary for testing, this will be replaced with the properties of the user object
    const tempEmail = 'sanijhuis@live.nl';
    return this.fileService.analyzeMythril(repoName, user.email);
    //What is should look like
    //return this.fileService.analyzeMythril(repoName, user.email);
  }

  @Post('upload')
  @UseGuards(AuthGuard('jwt'))
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
    })
  )
  async analyzeSingleFileSlither(@UploadedFile() file: Express.Multer.File) {
    this.fileService.analyzeSingleFile(file);
  }
}
