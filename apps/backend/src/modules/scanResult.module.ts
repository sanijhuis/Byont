import { Module } from '@nestjs/common';
import { ScanResultService } from '../services/scanResult.service';
import { ScanResultController } from '../controllers/scanResult.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { SharedModule } from './shared.module';

@Module({
  controllers: [ScanResultController],
  providers: [ScanResultService],
  imports: [SharedModule],
})
export class ScanResultModule {}
