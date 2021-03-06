import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../auth/entity/user.entity';
import { Schedule } from './schedule.entity';
import { Exclude } from 'class-transformer';
import { CreateLessonDto } from '../dto/create-lesson.dto';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Lesson extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  subject: string;

  @ApiProperty()
  @Column()
  cost: number;

  @ManyToOne(
    type => User,
    user => user.lessons,
    { eager: false },
  )
  user: User;

  @OneToMany(
    type => Schedule,
    schedule => schedule.lesson,
    { eager: true, cascade: true },
  )
  schedules: Schedule[];

  @Column()
  @Exclude()
  userId: number;

  public static toDto(entity: Lesson): CreateLessonDto {
    const dto = new CreateLessonDto();
    dto.lessonId = entity.id;
    dto.subject = entity.subject;
    dto.cost = entity.cost;
    dto.schedules = entity.schedules
      ? Schedule.toDtoList(entity.schedules)
      : [];
    return dto;
  }

  static toDtoList(lessons: Lesson[]) {
    return lessons.map(lesson => this.toDto(lesson));
  }
}
