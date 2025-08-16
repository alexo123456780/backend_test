import { Injectable, ConflictException, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Usuario, UserRole } from './entitie/user.entity';
import { RegistroUserDto } from './dtos/register.dto';
import { UserResponseDto } from './dtos/auth.dto';

@Injectable()

export class LoginService {

    constructor(

        @Inject(Usuario)
        private userRepository: Repository<Usuario>

    ){}

    /*  pending logi y mas 

    async registro(datos: RegistroUserDto):Promise<UserResponseDto>{




        






    }





*/














}
