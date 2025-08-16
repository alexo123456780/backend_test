import { IsString,  IsNotEmpty, MinLength,  IsEnum, IsOptional } from "class-validator";
import { UserRole } from "../entitie/user.entity";

export class RegistroUserDto{

    @IsString()
    @IsNotEmpty()
    userName: string;

    @IsString()
    @MinLength(4)
    password: string;

    @IsEnum(UserRole)
    @IsOptional()
    rol?: UserRole;

}

