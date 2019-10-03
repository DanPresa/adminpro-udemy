import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { URL_SERVICIOS } from '../../config/config';
import { Hospital } from '../../models/hospital.model';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalesService {
  token: string;

  constructor( private http: HttpClient, private _usuariosService: UsuarioService ) {
    this.token = this._usuariosService.token;
  }

  buscarHospital( termino: string ) {
    let url = `${ URL_SERVICIOS }/busqueda/coleccion/hospitales/${ termino }`;

    return this.http.get( url ).pipe(map((resp: any) => resp));
  }

  cargarHospitales() {
    let url = `${ URL_SERVICIOS }/hospital`;

    return this.http.get( url ).pipe(map((resp: any) => resp));
  }

  crearHospital( hospital: Hospital ) {
    let url = `${ URL_SERVICIOS }/hospital`;

    if ( hospital._id ) {
      url += `/${ hospital._id }?token=${ this.token }`;

      return this.http.put(url, hospital).pipe(map((resp: any) => resp));
    } else {
       url += `?token=${ this.token }`;

       return this.http.post( url, hospital ).pipe(map((resp: any) => resp));
    }
  }

  obtenerHospital( id: string ) {
    let url = `${ URL_SERVICIOS }/hospital/${ id }`;

    return this.http.get( url ).pipe(map((resp: any) => {
      return resp.hospital;
    }));
  }

  borrarHospital( hospital: Hospital ) {
    let url = `${ URL_SERVICIOS }/hospital/${ hospital._id }?token=${ this.token }`;

    return this.http.delete( url ).pipe(map((resp: any) => resp));
  }

}
