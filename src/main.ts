import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MultiStatusInterceptor } from './common/interceptors/multi-status.interceptor';
import { SWAGGER_DESC } from './common/constants/docs/swagger-desc.constant';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalInterceptors(new MultiStatusInterceptor());
  const config = new DocumentBuilder()
    .setTitle('Pricing grid API')
    .setDescription(SWAGGER_DESC)
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  await app.listen(process.env.API_PORT ?? 3000);
}
bootstrap();
