import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Swagger Proffy API')
    .setDescription('Application API to Proffy fullstack app')
    .setVersion('1.0')
    .addTag('lessons', 'Endpoint related to lessons and their time table.')
    .addTag('auth', 'Endpoint related authentication and token generation.')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
