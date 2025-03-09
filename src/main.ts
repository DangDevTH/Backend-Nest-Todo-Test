import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.use(cookieParser());
  const configService = app.get(ConfigService);
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  // app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector), {
  //   strategy: 'excludeAll',
  // }));
  await app.listen(configService.getOrThrow<number>('appConfig.port'));
  console.log('Running on port ', configService.getOrThrow<number>('appConfig.port'));
}
bootstrap();
