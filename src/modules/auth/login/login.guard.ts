import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, ForbiddenException, SetMetadata } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { UserRole } from '../entitie/user.entity';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt'){

  canActivate(context:ExecutionContext){

    return super.canActivate(context);

  }


  handleRequest(err:any ,user:any, info:any){
    
    if(err || !user){

      throw err || new UnauthorizedException('Token invalido o ya vencio');

    }

    return user;


  }
}

@Injectable()
export class LocalAuthGuard extends AuthGuard('local'){}

export const ROLES_KEY = 'roles';
export const Roles = ((...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles) );





@Injectable()
export class RolesGuard implements CanActivate{


  constructor(private reflector: Reflector){

  }

  canActivate(context:ExecutionContext):boolean{

    const rolesRequeridos = this.reflector.getAllAndOverride<UserRole[]>(

      ROLES_KEY, [

        context.getHandler(),
        context.getClass()

      ]
    )

    if(!rolesRequeridos){

      return true;

    }

    const {usuario} = context.switchToHttp().getRequest();

    if(!usuario){

      throw new UnauthorizedException('Usuario no logeado');

    }

    const hasRole = rolesRequeridos.some(role => usuario.rol === role);

    if(!hasRole){

      throw new ForbiddenException('Acceso denegado');

    }


    return true;


  }

}




@Injectable()
export class LoginGuard implements CanActivate {

  canActivate(
    context: ExecutionContext,
  ): boolean  {
    
    const {usuario} = context.switchToHttp().getRequest();

    if(!usuario){

      throw new UnauthorizedException('Usuario no logeado');


    }


    if(usuario.rol !== UserRole.Administrador){


      throw new ForbiddenException('Solo los administradores pueden acceder')


    }


    return true;



  }




}
