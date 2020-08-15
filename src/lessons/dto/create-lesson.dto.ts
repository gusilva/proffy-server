import { LessonScheduleDto } from './lesson-schedule.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateLessonDto {
  @IsOptional()
  lessonId: number;

  @ApiProperty()
  @IsNotEmpty()
  subject: string;

  @ApiProperty()
  @IsNotEmpty()
  cost: number;

  @ApiProperty({ type: [LessonScheduleDto] })
  schedules: LessonScheduleDto[];
}
