// src/scan-result/scan-result.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ScanResultService {
  constructor(private readonly prisma: PrismaService) {}

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
