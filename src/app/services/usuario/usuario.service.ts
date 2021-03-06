import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

// Services
import { AlertaService } from '../alerta/alerta.service';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';

import { URL_SERVICIOS } from '../../config/config';
import { Usuario } from '../../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuario: Usuario;
  token: string;

  constructor(
    private router: Router,
    private http: HttpClient,
    private _alertaService: AlertaService,
    private _subirArchivoService: SubirArchivoService
  ) {
    this.cargarStorage();
  }

  estaLogueado() {
    return ( localStorage.getItem('token') ) ? true : false;
  }

  cargarStorage() {
    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage( id: string, token: string, usuario: Usuario ) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  logOut() {
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('itempages');

    this.router.navigate(['/login']);
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

  actualizarUsuario( usuario: Usuario ) {
    let url = `${ URL_SERVICIOS }/usuario/${ usuario._id }?token=${ this.token }`;

    return this.http.put(url, usuario).pipe(map((resp: any) => {

      if ( usuario._id === this.usuario._id ) {
        let usuarioDB = resp.usuario;
        this.guardarStorage(usuarioDB._id, this.token, usuarioDB);
      }

      this._alertaService.mostrarAlerta('success', resp.mensaje, usuario.nombre, 2000);
      return resp;
    }));
  }

  cambiarImagen( archivo: File, id: string ) {
    this._subirArchivoService.subirArchivo( archivo, 'usuarios', id )
    .then((resp: any) => {
      this.usuario.img = resp.usuario.img;
      this._alertaService.mostrarAlerta('success', 'Imagen de usuario actualizada', this.usuario.nombre, 2000);
      this.guardarStorage(id, this.token, this.usuario);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  cargarUsuarios() {
    let url = `${ URL_SERVICIOS }/usuario`;

    return this.http.get( url ).pipe(map((resp: any) => resp));
  }

  buscarUsuarios( termino: string ) {
    let url = `${ URL_SERVICIOS }/busqueda/coleccion/usuarios/${ termino }`;

    return this.http.get( url ).pipe(map((resp: any) => resp.usuarios));
  }

  borrarUsuario( id: string ) {
    let url = `${ URL_SERVICIOS }/usuario/${ id }?token=${ this.token }`;

    return this.http.delete( url ).pipe(map((resp: any) => resp.usuario));
  }
}

