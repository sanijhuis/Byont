import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class RepoService {
  constructor(private prisma: PrismaService) {}

  async findRepoByNameAndUserId(
    repoName: string,
    userId: number
  ): Promise<number> {
    const repo = await this.prisma.repo.findFirst({
      where: {
        name: repoName,
        userId: userId,
      },
    });

    if (!repo) {
      throw new NotFoundException(
        `Repo with name "${repoName}" not found for user with ID ${userId}`
      );
    }

    return repo.id;
  }

  findAll() {
    return this.prisma.repo.findMany();
  }

  findOne(id: number) {
    return this.prisma.repo.findUnique({ where: { id } });
  }

  create(data: any) {
    return this.prisma.repo.create({ data });
  }

  update(id: number, data: any) {
    return this.prisma.repo.update({ where: { id }, data });
  }

  delete(id: number) {
    return this.prisma.repo.delete({ where: { id } });
  }
}
