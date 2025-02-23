import { Test, TestingModule } from '@nestjs/testing';
import { RoomService } from './room.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { NotFoundException } from '@nestjs/common';

const mockRoomRepository = () => ({
  create: jest.fn().mockImplementation((dto) => ({ ...dto, code: 'RANDOM' })),
  save: jest
    .fn()
    .mockImplementation((room) => Promise.resolve({ id: '1', ...room })),
  find: jest.fn().mockResolvedValue([]),
  findOne: jest
    .fn()
    .mockImplementation(({ where: { id } }) =>
      Promise.resolve(
        id === '1'
          ? {
              id: '1',
              name: 'Test Room Name',
              description: 'Test Room Description',
              code: 'RANDOM',
            }
          : null,
      ),
    ),
  remove: jest.fn().mockResolvedValue(true),
});

describe('RoomService', () => {
  let service: RoomService;
  let repository: Repository<Room>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoomService,
        {
          provide: getRepositoryToken(Room),
          useValue: mockRoomRepository(),
        },
      ],
    }).compile();

    service = module.get<RoomService>(RoomService);
    repository = module.get<Repository<Room>>(getRepositoryToken(Room));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a room with a random code', async () => {
    const dto = {
      name: 'Test Room Name',
      description: 'Test Room Description',
    };
    const result = await service.create(dto);
    expect(result).toHaveProperty('id', '1');
    expect(result).toHaveProperty('name', dto.name);
    expect(result).toHaveProperty('description', dto.description);
    expect(result).toHaveProperty('code');
    expect(result.code).toMatch(/^[A-Z0-9]{6}$/); // Ensures random code format
    expect(repository.create).toHaveBeenCalled();
    expect(repository.save).toHaveBeenCalled();
  });

  it('should return all rooms', async () => {
    await expect(service.findAll()).resolves.toEqual([]);
    expect(repository.find).toHaveBeenCalled();
  });

  it('should return a room by id', async () => {
    await expect(service.findOne('1')).resolves.toEqual({
      id: '1',
      name: 'Test Room Name',
      description: 'Test Room Description',
      code: 'RANDOM',
    });
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
  });

  it('should throw an error if room not found', async () => {
    await expect(service.findOne('2')).rejects.toThrow(NotFoundException);
  });

  it('should update a room', async () => {
    const updateDto = {
      name: 'Updated Room',
      description: 'Test Room Description',
    };
    await expect(service.update('1', updateDto)).resolves.toEqual({
      id: '1',
      ...updateDto,
      code: 'RANDOM',
    });
    expect(repository.save).toHaveBeenCalled();
  });

  it('should remove a room', async () => {
    await expect(service.remove('1')).resolves.toBeTruthy();
    expect(repository.remove).toHaveBeenCalled();
  });
});
