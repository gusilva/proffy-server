import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'docker',
  password: 'docker',
  database: 'proffy',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
};
