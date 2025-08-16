import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from "typeorm";

@Entity('puestos')

export class Puesto{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length:100})
    nombre: string;

    @Column('text',{nullable:true})
    descripcion: string;


    @Column('int')
    nivel_jerarquia: number;

    @Column({length:50})
    area_departamento: string;

    @Column({default:true})
    status: boolean;


    //relacion de puesto superior (padre)

    @Column({nullable:true})
    puesto_superior_id: number;

    @ManyToOne(() => Puesto, (puesto) => puesto.empleados ,{

        nullable: true,
        onDelete: 'CASCADE',

    })

    @JoinColumn({name:'puesto_superior_id'})

    puesto_superior: Puesto;


    //hijos

    @OneToMany(() => Puesto, (puesto)  => puesto.puesto_superior)

    empleados: Puesto[];

    @CreateDateColumn()
    fecha_creacion: Date;

    @UpdateDateColumn()
    fecha_modificacion: Date;

    @Column({length:50, nullable:true})
    usuario_creador:string;

    @Column({length:50, nullable: true})
    usuario_modificador:string;

}

