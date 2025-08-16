import { Controller, Get, Post, Put,Body, Patch, Param, Delete, Query, ParseIntPipe, ParseBoolPipe } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from "@nestjs/swagger";
import { PuestoService } from "../services/puesto.service";
import { CreatePuestoDTO } from "../dtos/crear-puesto.dto";
import { UpdatePuestoDto } from "../dtos/actualizar-puesto.dto";


@ApiTags('puestos')
@Controller('puestos')

export class PuestosController {


    constructor(private readonly puestoService: PuestoService){}

    @Post()
    @ApiOperation({summary:'Crear Nuevo Puesto'})
    @ApiResponse({status: 201, description:'Puesto creado exitosamente'})
    create(@Body() createPuesto: CreatePuestoDTO){

        return this.puestoService.Create(createPuesto);
    }






    









    
    





























}