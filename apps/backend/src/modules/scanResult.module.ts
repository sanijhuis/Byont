
import { Module } from '@nestjs/common';
import { ScanResultService } from '../services/scanResult.service';
import { ScanResultController } from '../controllers/scanResult.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [ScanResultController],
  providers: [ScanResultService, PrismaService],
})
export class ScanResultModule {}
