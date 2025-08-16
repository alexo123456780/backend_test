import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";

export enum UserRole {

    Administrador = 'admin',
    Editor = 'editor',
    Viewer = 'view'

}

@Entity('usuarios')
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true})
    userName: string;

    @Column()
    password: string;

    @Column({

        type: 'enum',
        enum: UserRole,
        default: UserRole.Viewer
    })
    rol: UserRole


    @Column({default:true})
    estaActivo: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}


