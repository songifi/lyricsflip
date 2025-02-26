// src/practice/practice.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PracticeSession } from './entities/practice-session.entity';
import { PracticeResult } from './entities/practice-result.entity';
import { PracticeItem } from './entities/practice-item.entity';
import { UserProgress } from './entities/user-progress.entity';
import { PracticeSessionService } from './services/practice-session.service';
import { PracticeItemService } from './services/practice-item.service';
import { PracticeResultService } from './services/practice-result.service';
import { FeedbackService } from './services/feedback.service';
import { UserProgressService } from './services/user-progress.service';
import { PracticeSessionController } from './controllers/practice-session.controller';
import { PracticeItemController } from './controllers/practice-item.controller';
import { PracticeResultController } from './controllers/practice-result.controller';
import { UserProgressController } from './controllers/user-progress.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PracticeSession,
      PracticeResult,
      PracticeItem,
      UserProgress
    ])
  ],
  controllers: [
    PracticeSessionController,
    PracticeItemController,
    PracticeResultController,
    UserProgressController
  ],
  providers: [
    PracticeSessionService,
    PracticeItemService,
    PracticeResultService,
    FeedbackService,
    UserProgressService
  ],
  exports: [
    PracticeSessionService,
    PracticeItemService,
    PracticeResultService,
    UserProgressService
  ]
})
export class PracticeModule {}
