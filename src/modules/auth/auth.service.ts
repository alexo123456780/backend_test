import { Injectable, ConflictException, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Usuario, UserRole } from './entitie/user.entity';
import { RegistroUserDto } from './dtos/register.dto';
import { UserResponseDto } from './dtos/auth.dto';

@Injectable()

export class AuthService {

    constructor(

        @InjectRepository(Usuario)
        private userRepository: Repository<Usuario>

    ){}


    async registro(datos: RegistroUserDto):Promise<UserResponseDto>{

        const {userName, password, rol } =  datos;

        //verificar que el usuario no exista 

        const usuarioExistente =  await this.userRepository.findOne({

            where: {userName}

        });

        if(usuarioExistente){

            throw new ConflictException('El usuario ya existe');

        }

        const saltRounds = 10;

        const passwordHash = await bcrypt.hash(password,saltRounds);



        const newUser = this.userRepository.create({

            userName: userName,
            password: passwordHash,
            rol: rol || UserRole.Viewer

        })

        return this.responseNewUser(newUser);

    }

    private responseNewUser(usuario:Usuario): UserResponseDto{

        return {

            id:usuario.id,
            userName: usuario.userName,
            rol: usuario.rol,
            estaActivo: usuario.estaActivo,
            createdAt: usuario.createdAt
        }
    }

    //buscar usuario para login

    async findbyUserName(userName:string): Promise<Usuario | null>{

        return this.userRepository.findOne({

            where: {userName: userName, estaActivo: true}
        })
    }

    //buscar por Id


    async findUserbyId(id: number):Promise<UserResponseDto>{


        const usuario = await this.userRepository.findOne({

            where: {id, estaActivo: true}

        });

        if(!usuario){

            throw new NotFoundException('No se encontro informacion relacionada a este usuario');

        }


        return this.responseNewUser(usuario);
    }


    async findAll(): Promise<UserResponseDto[]>{


        const usuarios = await this.userRepository.find({

            where: {estaActivo: true},
            order: {createdAt: 'DESC'}
        })


        return usuarios.map((usuario) => this.responseNewUser(usuario));


    }



    async validatePassword(plainPassword: string , hashedPassword: string): Promise<boolean>{

        return await bcrypt.compare(plainPassword, hashedPassword);


    }


    //creamos unos usuarios iniciales con los 3 roles disponibles


    async createDefaultUsers(): Promise<void>{

        const defaultUsers = [

            {userName: 'admin', password: 'prueba123', rol: UserRole.Administrador},
            {userName: 'editor' , password: 'test123', rol: UserRole.Editor },
            {userName: 'visualizador' , password: 'view123', rol: UserRole.Viewer }

        ]


        for(const usuario of defaultUsers){

            const usuarioExistente = await this.userRepository.findOne({

                where: {userName: usuario.userName}

            })


            if(!usuarioExistente){

                const hashPassword = await bcrypt.hash(usuario.password, 10)

                const newUser =  this.userRepository.create({

                    ...usuario,
                    password: hashPassword

                })

                await this.userRepository.save(newUser);


            }

        }
    }















    

























}
