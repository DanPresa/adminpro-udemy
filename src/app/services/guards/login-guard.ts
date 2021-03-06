import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor( private router: Router, private _usuarioService: UsuarioService ) {}

  canActivate() {
    if ( this._usuarioService.estaLogueado() ) {
      // console.log('Pasó el login guard');
      return true;
    } else {
      // console.log('Bloqueado por el guard');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
