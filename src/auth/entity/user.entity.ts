import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Lesson } from '../../lessons/entity/lesson.entity';
import { UserDto } from '../dto/user.dto';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  lastname: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ default: '' })
  whatsapp?: string;

  @Column({ default: '' })
  bio?: string;

  @Column({ default: '' })
  subject?: string;

  @Column()
  salt: string;

  @OneToMany(
    type => Lesson,
    lesson => lesson.user,
    { eager: true },
  )
  lessons: Lesson[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }

  public static toDto(entity: User): UserDto {
    const dto = new UserDto();
    dto.username = entity.username;
    dto.lastname = entity.lastname;
    dto.email = entity.email;
    dto.whatsapp = entity.whatsapp;
    dto.bio = entity.bio;
    dto.subject = entity.subject;
    return dto;
  }
}
