"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreakUpdatedEvent = exports.ScoreCalculatedEvent = void 0;
class ScoreCalculatedEvent {
    constructor(playerId, scoreResult, timestamp) {
        this.playerId = playerId;
        this.scoreResult = scoreResult;
        this.timestamp = timestamp;
    }
}
exports.ScoreCalculatedEvent = ScoreCalculatedEvent;
class StreakUpdatedEvent {
    constructor(playerId, newStreak, timestamp) {
        this.playerId = playerId;
        this.newStreak = newStreak;
        this.timestamp = timestamp;
    }
}
exports.StreakUpdatedEvent = StreakUpdatedEvent;
//# sourceMappingURL=scoring.events.js.map