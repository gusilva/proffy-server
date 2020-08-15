import { LessonScheduleDto } from '../../../src/lessons/dto/lesson-schedule.dto';
import { Weekday } from '../../../src/lessons/weekday.enum';

const scheduleDto: LessonScheduleDto[] = [
  {
    weekday: Weekday.FRIDAY,
    startTime: '08:00',
    endTime: '09:00',
  },
];

const scheduleEntityExpected = {
  weekday: Weekday.FRIDAY,
  start_time: 480,
  end_time: 540,
};

describe('Create Lesson DTO', () => {
  it('should convert an lesson schedule dto to a schedule', () => {
    expect(LessonScheduleDto.toEntity(scheduleDto[0])).toEqual(
      scheduleEntityExpected,
    );
  });

  it('should convert an lesson schedule dto list to a schedule list', () => {
    expect(LessonScheduleDto.toEntityList(scheduleDto)).toEqual([
      scheduleEntityExpected,
    ]);
  });
});
