import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PuestosModule } from './modules/puestos/puestos.module';
import { database } from './config/database.config';
import { LoginModule } from './modules/auth/login/login.module';

@Module({
  imports: 
  [
    ConfigModule.forRoot({

      isGlobal:true
    }),

    TypeOrmModule.forRoot(database),
    PuestosModule,
    LoginModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
