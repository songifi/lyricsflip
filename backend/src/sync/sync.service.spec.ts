// src/sync/sync.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SyncService } from './sync.service';
import { SyncRecord } from './entities/sync-record.entity';
import { SyncHistory } from './entities/sync-history.entity';
import { LastWriteWinsStrategy } from './strategies/last-write-wins.strategy';
import { ThreeWayMergeStrategy } from './strategies/three-way-merge.strategy';
import { SyncRequestDto, DeviceInfoDto } from './dto/sync-request.dto';
import { UserSettings } from './example-user-settings.model';

describe('SyncService', () => {
  let service: SyncService;
  let syncRecordRepo;
  let syncHistoryRepo;

  beforeEach(async () => {
    syncRecordRepo = {
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    };
    
    syncHistoryRepo = {
      findOne: jest.fn(),
      find: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SyncService,
        LastWriteWinsStrategy,
        ThreeWayMergeStrategy,]
         )}