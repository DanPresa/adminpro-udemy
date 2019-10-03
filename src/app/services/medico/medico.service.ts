import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { AlertaService } from '../alerta/alerta.service';
import { Medico } from '../../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  token: string;

  constructor(
    private _alertaService: AlertaService,
    private http: HttpClient,
    private _usuarioService: UsuarioService
  ) {
    this.token = this._usuarioService.token;
  }

  cargarMedicos() {
    let url = `${ URL_SERVICIOS }/medico`;

    return this.http.get( url ).pipe(map((resp: any) => {
      return resp;
    }));
  }

  obtenerMedico( id: string ) {
    let url = `${ URL_SERVICIOS }/medico/${ id }`;

    return this.http.get( url ).pipe(map((resp: any) => resp.medico));
  }

  buscarMedico( termino: string ) {
    let url = `${ URL_SERVICIOS }/busqueda/coleccion/medicos/${ termino }`;

    return this.http.get( url ).pipe(map((resp: any) => resp.medicos));
  }

  guardarMedico( medico: Medico ) {
    let url = `${ URL_SERVICIOS }/medico`;

    if ( medico._id ) {
      url += `/${ medico._id }?token=${ this.token }`;

      return this.http.put(url, medico).pipe(map((resp: any) => {
        this._alertaService.mostrarAlerta('success', resp.mensaje, resp.medico.nombre);
        return resp;
      }));
    } else {
      url += `?token=${ this.token }`;

      return this.http.post( url, medico ).pipe(map((resp: any) => {
        this._alertaService.mostrarAlerta('success', resp.mensaje, resp.medico.nombre);
        return resp;
      }));
    }
  }

  borrarMedico( medico: Medico ) {
    let url = `${ URL_SERVICIOS }/medico/${ medico._id }?token=${ this.token }`;

    return this.http.delete( url ).pipe(map((resp: any) => resp));
  }
}
