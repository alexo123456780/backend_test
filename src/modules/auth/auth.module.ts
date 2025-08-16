import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LoginService } from './login/login.service';
import { LoginController } from './login/login.controller';
import { LoginModule } from './login/login.module';

@Module({
  providers: [AuthService, LoginService],
  controllers: [AuthController, LoginController],
  imports: [LoginModule]
})
export class AuthModule {}
