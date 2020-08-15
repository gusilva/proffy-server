import { Weekday } from '../weekday.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Schedule } from '../schedule.entity';

export class LessonScheduleDto {
  @IsOptional()
  scheduleId?: number;

  @ApiProperty()
  @IsNotEmpty()
  weekday: Weekday;

  @ApiProperty()
  startTime: string;

  @ApiProperty()
  endTime: string;

  public static toEntityList(dtoList: LessonScheduleDto[]): Schedule[] {
    return dtoList.map(dto => this.toEntity(dto));
  }

  public static toEntity(dto: LessonScheduleDto): Schedule {
    const entity = new Schedule();
    entity.weekday = dto.weekday;
    entity.start_time = LessonScheduleDto.convertHourToMinutes(dto.startTime);
    entity.end_time = LessonScheduleDto.convertHourToMinutes(dto.endTime);
    return entity;
  }

  private static convertHourToMinutes(time: string): number {
    const [hour, minutes] = time.split(':').map(Number);
    return hour * 60 + minutes;
  }
}
