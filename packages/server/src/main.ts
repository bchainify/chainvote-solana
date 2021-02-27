import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    preflightContinue: false
  });
  const options = new DocumentBuilder()
    .setTitle('DappStarter')
    .setDescription('Full-Stack Blockchain App')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/', app, document, {
    customCss: `
    .topbar {display: none}
    `
  });

  await app.listen(process.env.PORT || 5002);
}
bootstrap();
