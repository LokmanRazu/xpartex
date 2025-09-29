import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); 

    app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',  
  });

  //   app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,              // strips unknown props
  //     forbidNonWhitelisted: true,   // throws error if extra props are passed
  //     transform: true,              // converts types (e.g. string → number)
  //   }),
  // );

  const config = new DocumentBuilder()
    .setTitle('xpartex Web API')
    .setDescription('Auto-generated Swagger API docs')
    .setVersion('1.0')
    .addBearerAuth({
      description: 'User JWT Token',
      type: 'http',
      scheme: 'bearer',
      in: 'header',
      name: 'jwt',
      bearerFormat: 'JWT',
    },
      'JWT-auth',)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
  Logger.log(`${await app.getUrl()}/api`) 
}
bootstrap();