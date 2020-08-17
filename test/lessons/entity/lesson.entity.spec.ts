import { Lesson } from '../../../src/lessons/entity/lesson.entity';
import { Weekday } from '../../../src/lessons/weekday.enum';
import { User } from '../../../src/auth/entity/user.entity';
import { Schedule } from '../../../src/lessons/entity/schedule.entity';
import { LessonDto } from '../../../src/lessons/dto/lesson.dto';

const user: User = new User();

const lesson: Lesson = {
  id: 1,
  subject: 'Math',
  cost: 100,
  user: user,
  userId: 1,
  schedules: [
    {
      weekday: Weekday.FRIDAY,
      start_time: 480,
      end_time: 540,
    } as Schedule,
  ],
  hasId: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
  softRemove: jest.fn(),
  recover: jest.fn(),
  reload: jest.fn(),
};

const lessonDtoExpected: LessonDto = {
  lessonId: 1,
  subject: 'Math',
  cost: 100,
  schedules: [
    {
      weekday: Weekday.FRIDAY,
      startTime: '08:00',
      endTime: '09:00',
    },
  ],
};

describe('Lesson Entity', () => {
  it('should convert a lesson entity to a lesson dto', function() {
    expect(Lesson.toDto(lesson)).toEqual(lessonDtoExpected);
  });
  it('should convert a lesson entity list to a lesson dto list', function() {
    expect(Lesson.toDtoList([lesson])).toEqual([lessonDtoExpected]);
  });
});
