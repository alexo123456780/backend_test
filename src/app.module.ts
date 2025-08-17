import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PuestosModule } from './modules/puestos/puestos.module';
import { database } from './config/database.config';
import { AuthModule } from './modules/auth/auth.module';

import { PassportModule } from '@nestjs/passport';

@Module({
  imports: 
  [
    ConfigModule.forRoot({

      isGlobal:true
    }),

    PassportModule,
    TypeOrmModule.forRoot(database),
    PuestosModule,
    AuthModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
