import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { StateRecoveryService } from '../services/state-recovery.service';
import { CreateStateRecoveryDto } from '../dto/create-state-recovery.dto';

@Controller('state-recovery')
export class StateRecoveryController {
  constructor(private readonly stateRecoveryService: StateRecoveryService) {}

  @Post('snapshot')
  async createSnapshot(@Body() createSnapshotDto: CreateStateRecoveryDto) {
    return this.stateRecoveryService.createSnapshot(
      createSnapshotDto.gameId,
      createSnapshotDto.playerId,
      createSnapshotDto.state,
    );
  }

  @Get('recover/:gameId')
  async recoverState(@Param('gameId') gameId: string) {
    return this.stateRecoveryService.recoverState(gameId);
  }

  @Post('rollback')
  async rollback(@Body() rollbackDto: { gameId: string; version: number }) {
    return this.stateRecoveryService.rollbackToVersion(
      rollbackDto.gameId,
      rollbackDto.version,
    );
  }
}
