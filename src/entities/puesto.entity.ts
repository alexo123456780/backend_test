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


    //relacion de uno 
















}

