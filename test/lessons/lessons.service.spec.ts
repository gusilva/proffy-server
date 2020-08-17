import { Test, TestingModule } from '@nestjs/testing';
import { LessonsService } from '../../src/lessons/lessons.service';
import { LessonsRepository } from '../../src/lessons/lessons.repository';
import { Lesson } from '../../src/lessons/entity/lesson.entity';
import { LessonDto } from '../../src/lessons/dto/lesson.dto';
import { LessonScheduleDto } from '../../src/lessons/dto/lesson-schedule.dto';

const mockUser = {
  id: 1,
  username: 'Test user',
  lastname: 'Test lastname',
  password: 'test password',
  email: 'user@test.me',
  salt: '$2b$10$mMknK9Y5mtyjyjH22UghRu',
  lessons: [],
};

const mockScheduleDto = [
  {
    weekday: 1,
    startTime: '09:00',
    endTime: '10:00',
    scheduleId: 1,
  } as LessonScheduleDto,
  {
    weekday: 2,
    startTime: '18:00',
    endTime: '19:00',
    scheduleId: 2,
  } as LessonScheduleDto,
];

const mockSchedule = [
  { weekday: 1, start_time: 540, end_time: 600, lessonId: 1, id: 1 },
  { weekday: 2, start_time: 1080, end_time: 1140, lessonId: 2, id: 2 },
];

const mockLessonRepoResponse = [
  {
    id: 1,
    subject: 'Math',
    cost: 10,
    userId: 1,
    schedules: [mockSchedule[1]],
  } as Lesson,
  {
    id: 2,
    subject: 'Math',
    cost: 20,
    userId: 2,
    schedules: [mockSchedule[0]],
  } as Lesson,
];

const mockLessonDtoResponse = [
  {
    lessonId: 1,
    subject: 'Math',
    cost: 10,
    schedules: [mockScheduleDto[1]],
  } as LessonDto,
  {
    lessonId: 2,
    subject: 'Math',
    cost: 20,
    schedules: [mockScheduleDto[0]],
  } as LessonDto,
];

const mockLessonEntity = {
  subject: 'Math',
  cost: 10,
  user: mockUser,
  schedules: [
    {
      weekday: 1,
      start_time: 540,
      end_time: 600,
      lessonId: 2,
      id: 3,
    },
  ],
  userId: 1,
  id: 2,
};

const mockLessonDto = {
  lessonId: 2,
  subject: 'Math',
  cost: 10,
  schedules: [
    {
      scheduleId: 3,
      weekday: 1,
      startTime: '09:00',
      endTime: '10:00',
    },
  ],
};

const mockLessonsRepository = () => ({
  getLessons: jest.fn(),
  createLesson: jest.fn(),
});

describe('LessonsService', () => {
  let lessonsService;
  let lessonsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LessonsService,
        { provide: LessonsRepository, useFactory: mockLessonsRepository },
      ],
    }).compile();

    lessonsService = module.get<LessonsService>(LessonsService);
    lessonsRepository = module.get<LessonsRepository>(LessonsRepository);
  });

  describe('getLessons', () => {
    it('should get the available lessons', async () => {
      lessonsRepository.getLessons.mockResolvedValue(mockLessonRepoResponse);
      expect(lessonsRepository.getLessons).not.toHaveBeenCalled();
      const result = await lessonsService.getLessons();
      expect(lessonsRepository.getLessons).toHaveBeenCalled();
      expect(result).toEqual(mockLessonDtoResponse);
    });
  });

  describe('createLesson', () => {
    it('should create a lesson', async () => {
      expect(lessonsRepository.createLesson).not.toHaveBeenCalled();
      lessonsRepository.createLesson.mockResolvedValue(mockLessonEntity);

      const createLessonDto = {
        subject: 'Math',
        cost: 10,
        schedules: [
          {
            weekday: 1,
            startTime: '09:00',
            endTime: '10:00',
          },
        ],
      };

      const result = await lessonsService.createLesson(
        createLessonDto,
        mockUser,
      );
      expect(lessonsRepository.createLesson).toHaveBeenCalledWith(
        createLessonDto,
        mockUser,
      );
      expect(result).toEqual(mockLessonDto);
    });
  });
});
