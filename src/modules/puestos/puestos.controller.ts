import { Controller, Get, Post, Put,Body, Patch, Param, Delete, Query, ParseIntPipe, ParseBoolPipe, UseGuards, Request } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBearerAuth } from "@nestjs/swagger";
import { PuestoService } from "./puesto.service";
import { CreatePuestoDTO } from "./dtos/crear-puesto.dto";
import { UpdatePuestoDto } from "./dtos/actualizar-puesto.dto";
import { UserRole } from "src/modules/auth/entitie/user.entity";
import { JwtAuthGuard, RolesGuard, Roles } from "src/modules/auth/login/login.guard";

@ApiTags('puestos')
@Controller('puestos')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard, RolesGuard)

export class PuestosController {


    constructor(private readonly puestoService: PuestoService){}

    @Post()
    @Roles(UserRole.Administrador, UserRole.Editor)
    @ApiOperation({summary:'Crear Nuevo Puesto'})
    @ApiResponse({status: 201, description:'Puesto creado exitosamente'})
    create(@Body() createPuesto: CreatePuestoDTO, @Request() req){

        return this.puestoService.Create(createPuesto, req.user?.userName);
    }

    @Get()
    @ApiOperation({summary:'Obtener todos los puestos'})
    @ApiResponse({status:200, description: 'Lista de puestos obtenidas correctamente'})
    @ApiQuery({name:'estatus', required:false, type: Boolean})
    @ApiQuery({name:'area_departamento', required: false, type:String})
    @ApiQuery({name:'nivel_jerarquico', required: false, type:Number})
    findAll(

        @Query('estatus', new ParseBoolPipe({optional:true})) estatus?:boolean,
        @Query('area_departamento') area_departamento?:string,
        @Query('nivel_jerarquico' , new ParseIntPipe({optional:true})) nivel_jerarquico?:number

    ){

        return this.puestoService.findAll({estatus,area_departamento,nivel_jerarquico})
    }




    @Get('organigrama')
    @ApiOperation({summary:'Obtener Estructura del Organigrama'})
    @ApiResponse({status:200, description:'Organigrama obtenido exitosamente'})
    getOrganigrama(){

        return this.puestoService.getOrganigrama()


    }


    @Get(':id')
    @ApiOperation({summary:'Obtener puesto por Id'})
    @ApiResponse({status:200, description:'Puesto obtenido correctamente'})
    @ApiResponse({status:404, description: 'Puesto no encontrado'})
    findOne(@Param('id',ParseIntPipe) id:number ){

        return this.puestoService.findOne(id)

    }

    @Put(':id')
    @Roles(UserRole.Administrador, UserRole.Editor)
    @ApiOperation({summary:'Actualizar Puesto'})
    @ApiResponse({status:200, description:'Puesto actualizado correctamente'})
    update(@Param('id',ParseIntPipe) id:number, @Body() updatePuesto:UpdatePuestoDto, @Request() req){

        return this.puestoService.update(id, updatePuesto, req.user?.userName)

    }


    @Delete(':id')
    @Roles(UserRole.Administrador)
    @ApiOperation({summary:'Eliminar puesto baja logica'})
    @ApiResponse({status:200, description:'Puesto Eliminado exitosamente'})
    remove(@Param('id',ParseIntPipe) id: number, @Request() req){

        return this.puestoService.remove(id, req.user?.userName)

    }















    









    
    





























}