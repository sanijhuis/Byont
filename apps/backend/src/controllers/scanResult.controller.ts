import { Controller, Get, Param } from '@nestjs/common';
import { ScanResultService } from './../services/scanResult.service';

@Controller('repo')
export class ScanResultController {
  constructor(private readonly scanResultService: ScanResultService) {}

  @Get(':repoName')
  async getScanResultsByRepoName(@Param('repoName') repoName: string) {
    return this.scanResultService.getScanOutputsByRepoName(repoName);
  }

  @Get(':repoName/:id')
  async getScanResultByRepoNameAndId(
    @Param('repoName') repoName: string,
    @Param('id') id: number
  ) {
    return this.scanResultService.getScanOutputByRepoNameAndId(repoName, id);
  }
}
