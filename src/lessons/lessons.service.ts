import { Inject, Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { LessonsRepository } from './lessons.repository';
import { Lesson } from './lesson.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class LessonsService {
  constructor(
    @Inject(LessonsRepository)
    private lessonsRepository: LessonsRepository,
  ) {}

  async getLessons(): Promise<Lesson[]> {
    return this.lessonsRepository.getLessons();
  }

  async createLesson(
    createLessonDto: CreateLessonDto,
    user: User,
  ): Promise<CreateLessonDto> {
    return Lesson.toDto(await this.lessonsRepository.createLesson(createLessonDto, user));
  }
}
