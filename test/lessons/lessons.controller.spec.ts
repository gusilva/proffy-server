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
  validatePassword: jest.fn(),
};

const lessonExpected = [
  {
    lessonId: 1,
    subject: 'Math',
    cost: 10,
    schedules: [
      {
        weekday: 2,
        startTime: '08:00',
        endTime: '10:00',
      },
    ],
  },
  {
    lessonId: 2,
    subject: 'History',
    cost: 100,
    schedules: [
      {
        weekday: 3,
        startTime: '18:00',
        endTime: '19:00',
      },
    ],
  },
];

describe('Lessons Controller', () => {
  let controller: LessonsController;
  let service: LessonsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LessonsController],
      providers: [
        {
          provide: LessonsService,
          useValue: {
            getLessons: jest.fn().mockResolvedValue(lessonExpected),
          },
        },
      ],
    }).compile();

    controller = module.get<LessonsController>(LessonsController);
    service = module.get<LessonsService>(LessonsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get a array of lessons', () => {
    expect(controller.getLessons(mockUser)).resolves.toEqual(lessonExpected);
  });
});
