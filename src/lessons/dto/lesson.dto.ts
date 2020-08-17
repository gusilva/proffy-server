import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LessonScheduleDto } from './lesson-schedule.dto';

export class LessonDto {
  @ApiProperty()
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
