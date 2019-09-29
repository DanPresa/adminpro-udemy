import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { URL_SERVICIOS } from '../../config/config';

import { Usuario } from '../../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuario: Usuario;
  token: string;

  constructor( private http: HttpClient ) {
    console.log('User service listo');
  }

  guardarStorage( id: string, token: string, usuario: Usuario ) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  loginGoogle( token: string ) {
    let url = `${ URL_SERVICIOS }/login/google`;

    return this.http.post(url, { token }).pipe(map((resp: any) => {
      this.guardarStorage(resp.id, resp.token, resp.usuario);
      return true;
    }));
  }

  login( usuario: Usuario, recuerdame: boolean = false ) {
    if ( !recuerdame ) {
      localStorage.removeItem('email');
    } else {
      localStorage.setItem('email', usuario.email);
    }

    let url = `${ URL_SERVICIOS }/login`;

    return this.http.post( url, usuario ).pipe(map((resp: any) => {
      this.guardarStorage( resp.id, resp.token, resp.usuario );
      return true;
    }));
  }

  crearUsuario( usuario: Usuario ) {
    let url = `${ URL_SERVICIOS }/usuario`;

    return this.http.post( url, usuario ).pipe(map((resp: any) => resp.usuario));
  }
}
