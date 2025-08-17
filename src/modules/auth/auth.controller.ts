import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegistroUserDto } from './dtos/register.dto';
import { LoginDto } from './dtos/auth.dto';
import { VerificarTokenDto } from './dtos/verificar-token.dto';
import { JwtAuthGuard, RolesGuard, Roles } from './login/login.guard';
import { UserRole } from './entitie/user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @ApiOperation({summary: 'Iniciar sesión'})
    @ApiResponse({status: 200, description: 'Login exitoso'})
    @ApiResponse({status: 401, description: 'Credenciales inválidas'})
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Post('verificar-token')
    @ApiOperation({summary: 'Verificar token JWT'})
    @ApiResponse({status: 200, description: 'Token válido', schema: {
        example: { valid: true, payload: { sub: 1, userName: 'admin', rol: 'Administrador' } }
    }})
    @ApiResponse({status: 200, description: 'Token inválido', schema: {
        example: { valid: false, message: 'Token inválido o expirado' }
    }})
    async verificarToken(@Body() verificarTokenDto: VerificarTokenDto) {
        return this.authService.verificarToken(verificarTokenDto.token);
    }

    @Post('registro')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.Administrador)
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({summary: 'Registrar nuevo usuario'})
    @ApiResponse({status: 201, description: 'Usuario registrado exitosamente'})
    registro(@Body() registroDto: RegistroUserDto) {
        return this.authService.registro(registroDto);
    }

    @Get('usuarios')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.Administrador)
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({summary: 'Obtener todos los usuarios'})
    @ApiResponse({status: 200, description: 'Lista de usuarios obtenida'})
    findAll() {
        return this.authService.findAll();
    }
}