import { Lesson } from '../../src/lessons/lesson.entity';
import { Weekday } from '../../src/lessons/weekday.enum';
import { User } from '../../src/auth/user.entity';
import { Schedule } from '../../src/lessons/schedule.entity';

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

const lessonDtoExpected = {
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
});
