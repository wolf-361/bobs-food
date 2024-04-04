import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { configService } from './config/config.service';
import { RoleGuard } from './guards/role/role.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix('api');

  if (configService.isDev) {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('Bob\'s duck API')
      .setDescription('Projet de session pour le cours de conception de logiciel INF1007')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api/doc', app, document);
  }
  
  await app.listen(3000);
}
bootstrap();
