import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const database: TypeOrmModuleOptions = {

    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'db_organigrama_empresarial',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: process.env.NODE_ENV !== 'production', 
    logging: true,

}