import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '../auth/user.entity';
import { GetUser } from '../auth/get-user.decorator';
import { LessonsService } from './lessons.service';
import { Lesson } from './lesson.entity';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('lessons')
@ApiBearerAuth()
@Controller('lessons')
@UseGuards(AuthGuard('jwt'))
export class LessonsController {
  constructor(private lessonsService: LessonsService) {}

  @Get()
  @ApiOperation({ summary: 'Get Lessons' })
  @ApiResponse({ status: 200, description: 'The found lessons' })
  getLessons(@GetUser() user: User): Promise<Lesson[]> {
    return this.lessonsService.getLessons();
  }

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(new ValidationPipe({ transform: true }))
  createLesson(
    @Body() createLessonDto: CreateLessonDto,
    @GetUser() user: User,
  ): Promise<CreateLessonDto> {
    return this.lessonsService.createLesson(createLessonDto, user);
  }
}
