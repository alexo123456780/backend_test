import { IsOptional, IsBoolean, IsString, IsInt, Min } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";

export class FiltrosPuestoDto{

    @ApiPropertyOptional({description:'Filtrar por estatus activo/inactivo'})
    @IsOptional()
    @IsBoolean()
    @Transform(({value}) => value === 'true')
    estatus?:boolean


    @ApiPropertyOptional({description:'Filtrar por area de departamento'})
    @IsOptional()
    @IsString()
    area_departamento?:string


    @ApiPropertyOptional({description:'Filtrar por nivel de jerarquia'})
    @IsOptional()
    @IsInt()
    @Min(1)
    @Transform(({value}) => parseInt(value))
    nivel_jerarquico?:number

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    nombre?:string









}