// src/sync/sync.controller.ts
import { Controller, Post, Body, Get, Param, Query, UseGuards } from '@nestjs/common';
import { SyncService } from './sync.service';
import { SyncRequestDto } from './dto/sync-request.dto';
import { SyncResponseDto } from './dto/sync-response.dto';
import { DeltaUpdateDto } from './dto/delta-update.dto';
import { SyncHistory } from './entities/sync-history.entity';
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('sync')
export class SyncController {
  constructor(private readonly syncService: SyncService) {}
  
  @Post()
  // @UseGuards(JwtAuthGuard)
  async syncData(@Body() syncRequest: SyncRequestDto<any>): Promise<SyncResponseDto<any>> {
    return this.syncService.sync(syncRequest);
  }
  
  @Post('delta')
  // @UseGuards(JwtAuthGuard)
  async applyDelta(@Body() deltaUpdate: DeltaUpdateDto<any>): Promise<SyncResponseDto<any>> {
    return this.syncService.applyDeltaUpdate(deltaUpdate);
  }
  
  @Get(':userId/:dataType')
  // @UseGuards(JwtAuthGuard)
  async getSyncData(
    @Param('userId') userId: string,
    @Param('dataType') dataType: string,
  ): Promise<SyncResponseDto<any>> {
    return this.syncService.getSyncData(userId, dataType);
  }
  
  @Get(':userId/:dataType/history')
  // @UseGuards(JwtAuthGuard)
  async getSyncHistory(
    @Param('userId') userId: string,
    @Param('dataType') dataType: string,
    @Query('limit') limit?: number,
  ): Promise<SyncHistory[]> {
    return this.syncService.getSyncHistory(userId, dataType, limit);
  }
  
  @Get(':userId/:dataType/patches/:fromVersion')
  // @UseGuards(JwtAuthGuard)
  async getPatches(
    @Param('userId') userId: string,
    @Param('dataType') dataType: string,
    @Param('fromVersion') fromVersion: number,
  ): Promise<any[]> {
    return this.syncService.generatePatches(userId, dataType, fromVersion);
  }
}