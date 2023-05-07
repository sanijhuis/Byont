import { Controller, Get, Param, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileService } from 'src/services/file.service';

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
    return this.fileService.analyzeSlither(repoName, tempEmail);
  }

  @Get('analyze-mythril/:repoName')
  async analyzeMythril(
    @Param('repoName') repoName: string,
    @Req() req: Request
  ) {
    const user = req['customUser'];
    //Temporary for testing, this will be replaced with the properties of the user object
    const tempEmail = 'meesvanberkel120@hotmail.com';
    return this.fileService.analyzeMythril(repoName, tempEmail);
    //What is should look like
    //return this.fileService.analyzeMythril(repoName, user.email);
  }
}
