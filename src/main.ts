import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  const config = new DocumentBuilder()
    .setBasePath('api/v1/')
    .setTitle('API Teste Prático DAVID - GSW/EMBRAER')
    .setDescription('Document API from church integration API')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'Authorization',
    )
    .addTag('health check')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc/swagger', app, document);
  await app.listen(3000);
}
bootstrap();
