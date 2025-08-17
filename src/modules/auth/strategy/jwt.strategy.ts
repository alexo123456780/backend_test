import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from "../auth.service";

export interface JtPayload {
    sub: string | number;
    userName: string;
    rol: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(private authService: AuthService){

        super({

            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'mi-clave-super-secreta-para-jwt-2025'

        })


    }


    async validate(payload: JtPayload){

        try{
            // Convertir el ID a number porque JWT puede devolverlo como string
            const userId = Number(payload.sub);
            const usuario = await this.authService.findUserbyId(userId);

            return {
                id: usuario.id,
                userName: usuario.userName,
                rol: usuario.rol,
            };

        }catch(error){
            throw new UnauthorizedException('Token invalido o ya vencio');

        }

    }













}