import { Test, TestingModule } from '@nestjs/testing';
import { NotificationController } from '../controllers/notification.controller';

describe('NotificationController', () => {
  let controller: NotificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationController],
    }).compile();

    controller = module.get<NotificationController>(NotificationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
