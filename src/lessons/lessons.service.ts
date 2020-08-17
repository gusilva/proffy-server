import { Inject, Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { LessonsRepository } from './lessons.repository';
import { Lesson } from './entity/lesson.entity';
import { User } from '../auth/entity/user.entity';
import { LessonDto } from './dto/lesson.dto';

@Injectable()
export class LessonsService {
  constructor(
    @Inject(LessonsRepository)
    private lessonsRepository: LessonsRepository,
  ) {}

  async getLessons(): Promise<LessonDto[]> {
    const lessons = await this.lessonsRepository.getLessons();
    return Lesson.toDtoList(lessons);
  }

  async createLesson(
    createLessonDto: CreateLessonDto,
    user: User,
  ): Promise<LessonDto> {
    return Lesson.toDto(
      await this.lessonsRepository.createLesson(createLessonDto, user),
    );
  }
}
