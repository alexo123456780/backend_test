import { PartialType } from "@nestjs/swagger";
import { CreatePuestoDTO } from "./crear-puesto.dto";
import { IsOptional, IsString, MaxLength } from "class-validator";


export class UpdatePuestoDto extends PartialType(CreatePuestoDTO){


    @IsOptional()
    @IsString()
    @MaxLength(50)
    usuario_modificador: string;



}