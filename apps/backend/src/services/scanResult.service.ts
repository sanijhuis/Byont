// src/scan-result/scan-result.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ScanResultService {
  constructor(private readonly prisma: PrismaService) { }

  //Get scanresults by RepoName and Id of scanresult
  async getScanResultByRepoNameAndId(repoName: string, id: number) {
    // Convert the id parameter to a number
    const numId = Number(id);

    // If the conversion is unsuccessful, throw an error
    if (isNaN(numId)) {
      throw new Error('Invalid id value');
    }
    return this.prisma.scanResult.findUnique({
      where: {
        id: numId,
      },
    });
  }

  async getScanResultsByRepoName(repoName: string) {
    return this.prisma.scanResult.findMany({
      where: {
        repo: {
          name: repoName,
        },
      },
    });
  }
}
