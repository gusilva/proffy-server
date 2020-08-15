import { Test, TestingModule } from '@nestjs/testing';
import { LessonsController } from '../../src/lessons/lessons.controller';
import { LessonsService } from '../../src/lessons/lessons.service';

const mockUser = {
  id: 1,
  username: 'Test user',
  lastname: 'Test lastname',
  password: 'test password',
  email: 'user@test.me',
  salt: '$2b$10$mMknK9Y5mtyjyjH22UghRu',
  hasId: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
  softRemove: jest.fn(),
  recover: jest.fn(),
  reload: jest.fn(),
  lessons: [],
  validatePassword: jest.fn()
};

describe('Lessons Controller', () => {
  let controller: LessonsController;
  let service: LessonsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LessonsController],
      providers: [
        { provide: LessonsService,
        useValue: {
          getLessons: jest.fn().mockResolvedValue([
            { id: 1, subject: "Math", cost: 10, userId: 1 },
            { id: 2, subject: "Math", cost: 20, userId: 1 },
          ])
        }
      }]
    }).compile();

    controller = module.get<LessonsController>(LessonsController);
    service = module.get<LessonsService>(LessonsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get a array of lessons', () => {
    expect(controller.getLessons(mockUser)).resolves.toEqual([
      { id: 1, subject: "Math", cost: 10, userId: 1 },
      { id: 2, subject: "Math", cost: 20, userId: 1 },
    ])
  });


});
