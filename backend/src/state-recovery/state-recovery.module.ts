@Module({
  imports: [
    TypeOrmModule.forFeature([GameState, StateAudit]),
    RedisModule
  ],
  controllers: [StateRecoveryController],
  providers: [
    StateRecoveryService,
    Logger
  ],
  exports: [StateRecoveryService]
})
export class StateRecoveryModule {}