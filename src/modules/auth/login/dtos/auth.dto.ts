import { IsString, MaxLength, IsNotEmpty, MinLength, IsEnum, IsOptional } from "class-validator";
import { UserRole } from "../entitie/user.entity";

export class LoginDto{

    @IsString()
    @IsNotEmpty()
    userName: string;

    @IsString()
    @IsNotEmpty()
    password: string;
    
}


//Dto de la respuesta
export class UserResponseDto{

    id:number;
    userName:string;
    rol: UserRole;
    estaActivo: boolean;
    createdAt: Date

}



export class LoginUserResponseDto{

    access_token: string;
    user: UserResponseDto;



}


