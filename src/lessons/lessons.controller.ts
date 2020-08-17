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
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { User } from '../auth/entity/user.entity';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { AuthGuard } from '@nestjs/passport';
import { LessonDto } from './dto/lesson.dto';

@ApiTags('lessons')
@ApiBearerAuth()
@Controller('lessons')
@UseGuards(AuthGuard('jwt'))
export class LessonsController {
  constructor(private lessonsService: LessonsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all Lessons' })
  @ApiOkResponse({ description: 'The found lessons', type: [LessonDto] })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  getLessons(@GetUser() user: User): Promise<LessonDto[]> {
    return this.lessonsService.getLessons();
  }

  @Post()
  @ApiOperation({ summary: 'Create a lesson' })
  @ApiCreatedResponse({
    description: 'Lesson has been successful created',
    type: LessonDto,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(new ValidationPipe({ transform: true }))
  createLesson(
    @Body() createLessonDto: CreateLessonDto,
    @GetUser() user: User,
  ): Promise<LessonDto> {
    return this.lessonsService.createLesson(createLessonDto, user);
  }
}
