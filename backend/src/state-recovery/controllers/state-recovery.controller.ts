@Controller('state-recovery')
export class StateRecoveryController {
  constructor(
    private readonly stateRecoveryService: StateRecoveryService
  ) {}

  @Post('snapshot')
  async createSnapshot(@Body() createSnapshotDto: CreateSnapshotDto) {
    return this.stateRecoveryService.createSnapshot(
      createSnapshotDto.gameId,
      createSnapshotDto.playerId,
      createSnapshotDto.state
    );
  }

  @Get('recover/:gameId')
  async recoverState(@Param('gameId') gameId: string) {
    return this.stateRecoveryService.recoverState(gameId);
  }

  @Post('rollback')
  async rollback(@Body() rollbackDto: RollbackDto) {
    return this.stateRecoveryService.rollbackToVersion(
      rollbackDto.gameId,
      rollbackDto.version
    );
  }
}