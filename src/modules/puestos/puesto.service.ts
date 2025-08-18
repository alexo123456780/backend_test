import { Injectable, NotFoundException, BadRequestException, flatten } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Puesto } from 'src/modules/puestos/entities/puesto.entity';
import { CreatePuestoDTO } from './dtos/crear-puesto.dto';
import { UpdatePuestoDto } from './dtos/actualizar-puesto.dto';

@Injectable()
export class PuestoService {


    constructor(

        @InjectRepository(Puesto)
        private puestosRepository: Repository<Puesto>

    ){}


    //registrar nuevo puesto

    async Create(crearPuestoDto:CreatePuestoDTO, usuarioCreador?: string): Promise<Puesto>{

        if(crearPuestoDto.puesto_superior_id){

            const puestoSuperior = await this.findOne(crearPuestoDto.puesto_superior_id);

            if(!puestoSuperior){

                throw new NotFoundException('Puesto superior no encontrado');

            }
        }

         const puesto = this.puestosRepository.create({
             ...crearPuestoDto,
             usuario_creador: usuarioCreador || crearPuestoDto.usuario_creador
         });

         return await this.puestosRepository.save(puesto);

    }


    //todos los puestos

    async findAll(filters?: {estatus?:boolean ; area_departamento?:string;  nivel_jerarquico?:number}): Promise<Puesto[]>{

        const queryBuilder = this.puestosRepository.createQueryBuilder('puesto').leftJoinAndSelect('puesto.puesto_superior','superior').leftJoinAndSelect(

            'puesto.empleados' , 'empleados'
        )


        if(filters?.estatus !== undefined){

            queryBuilder.andWhere('puesto.status = :estatus' , {estatus:filters.estatus});
        }

        if(filters?.area_departamento){


            queryBuilder.andWhere('puesto.area_departamento = :area',{

                area: filters.area_departamento


            })
        }

        if(filters?.nivel_jerarquico){

            queryBuilder.andWhere('puesto.nivel_jerarquia = :nivel',{

                nivel:filters.nivel_jerarquico
            })

        }


        return await queryBuilder.getMany();

    }



    async findOne(id:number):Promise<Puesto>{

        const puesto  = await this.puestosRepository.findOne({

            where: {id},
            relations: ['puesto_superior', 'empleados']
        })

        if(!puesto){

            throw new NotFoundException(`El puesto con Id ${id} no fue encontrado`);
        }

        return puesto;

    }


    //actualizar puesto

    async update(id:number , udapePuesto: UpdatePuestoDto, usuarioModificador?: string):Promise<Puesto>{

        const puesto = await this.findOne(id);


        //validar ciclos jerarquicos

        if(udapePuesto.puesto_superior_id){

            await this.validarCiclos(id, udapePuesto.puesto_superior_id)
    

        }

        Object.assign(puesto, {
            ...udapePuesto,
            usuario_modificador: usuarioModificador || udapePuesto.usuario_modificador
        });

        return await this.puestosRepository.save(puesto);

    }


    //baja logica del puesto
    async remove(id:number, usuarioModificador?: string):Promise<void>{

        const puesto = await this.findOne(id);

        puesto.status = false;
        if (usuarioModificador) {
            puesto.usuario_modificador = usuarioModificador;
        }

        await this.puestosRepository.save(puesto);

    }


    async getOrganigrama(): Promise<Puesto[]>{

        const puestos = await this.puestosRepository.find({

            where: {status:true},
            relations:['empleados', 'puesto_superior'],
            order: {nivel_jerarquia:'ASC'}

        })

        return this.buildTree(puestos);

    }


    private async validarCiclos(puestoId:number , superiorId:number):Promise<void>{

        if(puestoId === superiorId){

            throw new BadRequestException('Un puesto no puede ser superior de si mismo');

        }


        //verificar que no se creee un ciclo


        let currentSuperior = await this.puestosRepository.findOne({

            where:{id: superiorId},
            relations:['puesto_superior']

        });


        while(currentSuperior?.puesto_superior){

            if(currentSuperior.puesto_superior_id === puestoId){

              throw new BadRequestException('La jerarquia crearia un ciclo')

            }

            currentSuperior = await this.puestosRepository.findOne({

                where:{id:currentSuperior.puesto_superior_id},
                relations:['puesto_superior']

            })


        }
    }


    private buildTree(puestos: Puesto[]):Puesto[]{

        const puestosMap = new Map<number,Puesto>();
        const roots: Puesto[] = [];

        // Crear el mapa de puestos
        puestos.forEach(puesto =>{
            puestosMap.set(puesto.id, {...puesto, empleados:[]})
        })

        // Construir el árbol
        puestos.forEach(puesto =>{
            const puestoNode = puestosMap.get(puesto.id);

            if(puesto.puesto_superior_id){
                // Tiene jefe, agregarlo como empleado del jefe
                const parent = puestosMap.get(puesto.puesto_superior_id);
                if(parent && puestoNode){
                    parent.empleados.push(puestoNode)
                }
            } else {
                // NO tiene jefe, es un nodo raíz
                if(puestoNode){
                    roots.push(puestoNode);
                }
            }
        })

        return roots;
    }


    async getAreas(): Promise<string[]> {
        const result = await this.puestosRepository
            .createQueryBuilder('puesto')
            .select('DISTINCT puesto.area_departamento', 'area')
            .where('puesto.status = :status', { status: true })
            .getRawMany();
        
        return result.map(item => item.area).filter(area => area && area.trim() !== '');
    }

    // Obtener niveles jerárquicos únicos
    async getNivelesJerarquicos(): Promise<number[]> {
        const result = await this.puestosRepository
            .createQueryBuilder('puesto')
            .select('DISTINCT puesto.nivel_jerarquia', 'nivel')
            .where('puesto.status = :status', { status: true })
            .orderBy('puesto.nivel_jerarquia', 'ASC')
            .getRawMany();
        
        return result.map(item => item.nivel).filter(nivel => nivel != null);
    }


    

}
