import { IsString,  IsNotEmpty,   } from "class-validator";
import { UserRole } from "../entitie/user.entity";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto{

    @ApiProperty({

        description: 'userName',
        example: 'admin'

    })

    @IsString()
    @IsNotEmpty()
    userName: string;


    @ApiProperty({

        description: 'password',
        example: 'prueba123'

    })
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


