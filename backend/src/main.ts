import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { configService } from './config/config.service';
import { InitService } from './init/init.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Get the init service and initialize the database.
  const initService = app.get<InitService>(InitService);
  await initService.init();

  app.enableCors({
    origin: ['http://localhost:4200', '^(https?:\/\/)?(?:[\w-]+\.)?wolf-361\.ca\/.*$'], // Allow 'http://localhost:4200' and any subdomain of 'wolf-361.ca'
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
  });

  app.setGlobalPrefix('api');

  if (configService.isLocalOrDev) {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('Bob\'s food API')
      .setDescription('Projet de session pour le cours de conception de logiciel INF1007')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api/doc', app, document);
  }
  
  await app.listen(3000);
}
bootstrap();
