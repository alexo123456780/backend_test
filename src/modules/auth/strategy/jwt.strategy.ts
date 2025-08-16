import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from "../auth.service";

export interface JtPayload {

    sub: number;
    userName: string;
    rol: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(private authService: AuthService){

        super({

            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'clave-seguro-secret'

        })


    }


    async validate(payload: JtPayload){


        try{

            const usuario = await this.authService.findUserbyId(payload.sub)

            if(!usuario){

                throw new UnauthorizedException('Token Invalido');


            }


            return {

                id: usuario.id,
                userName: usuario.userName,
                rol: usuario.rol,

            }


        }catch(error){

            throw new UnauthorizedException('Token Invalido');


        }


    }













}