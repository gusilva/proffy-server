import { EntityRepository, Repository } from 'typeorm';
import { Lesson } from './entity/lesson.entity';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { User } from '../auth/entity/user.entity';
import { BadRequestException } from '@nestjs/common';
import { LessonScheduleDto } from './dto/lesson-schedule.dto';

@EntityRepository(Lesson)
export class LessonsRepository extends Repository<Lesson> {
  async getLessons(): Promise<Lesson[]> {
    const query = this.createQueryBuilder('lesson').innerJoinAndSelect(
      'lesson.schedules',
      'schedule',
    );
    return await query.getMany();
  }

  async createLesson(
    createLessonDto: CreateLessonDto,
    user: User,
  ): Promise<Lesson> {
    const lesson = this.create();
    lesson.subject = createLessonDto.subject;
    lesson.cost = createLessonDto.cost;
    lesson.user = user;
    lesson.schedules = LessonScheduleDto.toEntityList(
      createLessonDto.schedules,
    );

    try {
      await lesson.save();
    } catch (e) {
      throw new BadRequestException(e.message);
    }

    return lesson;
  }
}
