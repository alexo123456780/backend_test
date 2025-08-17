import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entitie/user.entity';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  providers: 
  [
    AuthService,
    JwtStrategy,
    LocalStrategy

  ],
  controllers: [AuthController],
  imports: 
  [
    TypeOrmModule.forFeature([Usuario]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'mi-clave-super-secreta-para-jwt-2025',
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    })

  ]
})
export class AuthModule {}
