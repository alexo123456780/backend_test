import { IsString, IsInt, IsBoolean, IsOptional, Min, MaxLength } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreatePuestoDTO{

    //se validan los datos de entrada con swagger tambien

    @ApiProperty({description:'Nombre del Puesto' , maxLength: 100})

    @IsString()
    @MaxLength(100)
    nombre: string;


    @ApiPropertyOptional({description:'Descripcion del puesto'})
    @IsOptional()
    @IsString()
    descripcion?: string;

    @ApiProperty({description:'Nivel Jerarquia', minimum:1})
    @IsInt()
    @Min(1)
    nivel_jerarquia: number;


    @ApiProperty({description:'Area o Departamento', maxLength:50 })
    @IsString()
    @MaxLength(50)
    area_departamento:string;


    @ApiPropertyOptional({description:'Id del Puesto Superior'})
    @IsOptional()
    @IsInt()
    puesto_superior_id?: number;

    @ApiPropertyOptional({description:'Estatus del puesto', default: true})
    @IsOptional()
    @IsBoolean()
    status?:boolean = true;

    @ApiPropertyOptional({description:'Usuario que registra el puesto'})
    @IsOptional()
    @IsString()
    @MaxLength(50)
    usuario_creador?:string;


}