import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Weekday } from '../weekday.enum';
import { Lesson } from './lesson.entity';
import { Exclude } from 'class-transformer';
import { LessonScheduleDto } from '../dto/lesson-schedule.dto';

@Entity()
export class Schedule extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  weekday: Weekday;

  @Column()
  start_time: number;

  @Column()
  end_time: number;

  @ManyToOne(
    type => Lesson,
    lesson => lesson.schedules,
    { eager: false },
  )
  lesson: Lesson;

  @Column()
  @Exclude()
  lessonId: number;

  public static toDto(entity: Schedule): LessonScheduleDto {
    const dto = new LessonScheduleDto();
    dto.scheduleId = entity.id;
    dto.weekday = entity.weekday;
    dto.startTime = this.convertMinutesToHour(entity.start_time);
    dto.endTime = this.convertMinutesToHour(entity.end_time);
    return dto;
  }

  static toDtoList(schedules: Schedule[]): LessonScheduleDto[] {
    return schedules.map(sch => this.toDto(sch));
  }

  private static convertMinutesToHour(minutes: number): string {
    const hour = Math.floor(minutes / 60);
    const min = minutes % 60;

    return this.digitFormat(hour, min);
  }

  private static digitFormat(hour: number, min: number): string {
    return `${String(hour).padStart(2, '0')}:${String(min).padStart(2, '0')}`;
  }
}
