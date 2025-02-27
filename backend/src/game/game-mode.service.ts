/ src/game/game-mode.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ClassicModeService } from './game-modes/classic-mode.service';
import { TimeAttackModeService } from './game-modes/time-attack-mode.service';
import { EndlessModeService } from './game-modes/endless-mode.service';
import { BattleRoyaleModeService } from './game-modes/battle-royale-mode.service';
import { GameMode } from './interfaces/game-mode.interface';

@Injectable()
export class GameModeService implements OnModuleInit {
  private modes: Map<string, GameMode> = new Map();

  constructor(
    private readonly classicMode: ClassicModeService,
    private readonly timeAttackMode: TimeAttackModeService,
    private readonly endlessMode: EndlessModeService,
    private readonly battleRoyaleMode: BattleRoyaleModeService,
  ) {}

  onModuleInit() {
    // Initialize all game modes
    this.classicMode.initialize();
    this.timeAttackMode.initialize();
    this.endlessMode.initialize();
    this.battleRoyaleMode.initialize();

    // Register game modes
    this.registerMode(this.classicMode);
    this.registerMode(this.timeAttackMode);
    this.registerMode(this.endlessMode);
    this.registerMode(this.battleRoyaleMode);
  }

  private registerMode(mode: GameMode): void {
    this.modes.set(mode.id, mode);
  }

  getAllModes(): GameMode[] {
    return Array.from(this.modes.values());
  }

  getModeById(id: string): GameMode {
    const mode = this.modes.get(id);
    if (!mode) {
      throw new Error(`Game mode ${id} not found`);
    }
    return mode;
  }
}