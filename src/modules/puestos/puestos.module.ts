import { PuestoService } from './puesto.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PuestosController } from './puestos.controller';
import { Puesto } from 'src/modules/puestos/entities/puesto.entity';

@Module({

    imports: [TypeOrmModule.forFeature([Puesto])],
    controllers: [PuestosController],
    providers:[PuestoService],
    exports:[PuestoService]

})

export class PuestosModule {}