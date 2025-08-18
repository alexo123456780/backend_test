import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AuthService } from './modules/auth/auth.service';


async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.setGlobalPrefix('api');

  app.useGlobalPipes(

    new ValidationPipe({

      whitelist:true,
      forbidNonWhitelisted:true,
      transform:true

    })
  )


  const config = new DocumentBuilder()
    .setTitle('Organigrama Api')
    .setDescription('API para gestión de organigrama empresarial')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Ingresa tu token JWT',
        in: 'header',
      },
      'JWT-auth'
    )
    .build();

    //swagger API
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Se crean los 3 usuarios iniciales con los 3 roles para probar despues en los roles 
  const authService = app.get(AuthService);
  await authService.createDefaultUsers();

  await app.listen(3000);

}
bootstrap();
