import { Controller, Get, Param } from '@nestjs/common';
import { ScanResultService } from './../services/scanResult.service';

@Controller('repo')
export class ScanResultController {
  constructor(private readonly scanResultService: ScanResultService) {}

  @Get(':repoName')
  async getScanResultsByRepoName(@Param('repoName') repoName: string) {
    return this.scanResultService.getScanResultsByRepoName(repoName);
  }
}
