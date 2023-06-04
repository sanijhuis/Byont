// src/scan-result/scan-result.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ScanResultService {
  constructor(private readonly prisma: PrismaService) { }

  async findOwnerByRepoName(repoName: string): Promise<string | null> {
    const repo = await this.prisma.repo.findFirst({
      where: {
        name: repoName,
      },
      select: {
        owner: true,
      },
    });
  
    return repo ? repo.owner : null;
  }

  //Get scanresults by RepoName and Id of scanOutput
  async getScanOutputByRepoNameAndId(repoName: string, id: number) {
    // Convert the id parameter to a number
    const numId = Number(id);
   
    // If the conversion is unsuccessful, throw an error
    if(isNaN(numId)) {
      throw new Error('Invalid id value');
    }
  
    const ownerName = await this.findOwnerByRepoName(repoName);
if (!ownerName) {
  throw new Error('No repository found with the given name');
}

    // Find the repo with the given repoName
    const repo = await this.prisma.repo.findUnique({
      where: {
        name_owner: {
          name: repoName,
          owner: ownerName, // you need to have the ownerName
        },
      },
    });
  
    // If no repo is found, throw an error
    if (!repo) {
      throw new Error('No repository found with the given name');
    }
  
    // Find the scan output with the given id and repoId
    const scanOutput = await this.prisma.scanOutput.findFirst({
      where: {
        id: numId,
        repoId: repo.id,
      },
      include: {
        scanOutputItems: true, // Include ScanOutputItems in the response
      },
    });
  
    // If no scan output is found, throw an error
    if (!scanOutput) {
      throw new Error('No scan output found with the given id for this repository');
    }
  
    return scanOutput;
  }
  
  

  async getScanOutputsByRepoName(repoName: string) {
    return this.prisma.scanOutput.findMany({
      where: {
        repo: {
          name: repoName,
        },
      },
      include: {
        scanOutputItems: true, // Include ScanOutputItems in the response
      },
    });
  }
}
