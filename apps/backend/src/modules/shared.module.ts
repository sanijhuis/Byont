// shared.module.ts
import { Module, Global } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
    providers: [PrismaService, ConfigService],
    exports: [PrismaService, ConfigService],
})
export class SharedModule { }
