import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { Usuario } from '../../models/usuario.model';
import { UsuarioService, AlertaService } from '../../services/service.index';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  totalRegistros: number = 0;
  cargando: boolean = true;
  p: number = 1;
  items: string = '5';

  constructor(
    private _alertaService: AlertaService,
    private _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();
    this.items = localStorage.getItem('itempages') || '5';
  }

  cargarUsuarios() {
    this.cargando = true;

    this._usuarioService.cargarUsuarios().subscribe((resp) => {
      this.totalRegistros = resp.totalUsuarios;
      this.usuarios = resp.usuarios;
      this.cargando = false;
    });
  }

  mostrarItems( itemsPerPages: string ) {
    this.items = itemsPerPages;
    localStorage.setItem('itempages', itemsPerPages);
  }

  buscarUsuario( termino: string ) {
    if ( termino.length === 0 ) {
      this.cargarUsuarios();
      return;
    }

    this._usuarioService.buscarUsuarios( termino ).subscribe((usuarios: Usuario[]) => {
      console.log(usuarios);
      this.usuarios = usuarios;
    });
  }

  borrarUsuario( usuario: Usuario ) {
    if ( usuario._id === this._usuarioService.usuario._id ) {
      this._alertaService.mostrarAlerta('error', 'No puede borrarse a si mismo');
      return;
    }
    Swal.fire({
      title: 'Está seguro de borrar a?',
      text: usuario.nombre,
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {
        this._usuarioService.borrarUsuario( usuario._id ).subscribe((resp) => {
          Swal.fire('Usuario borrado!', resp.nombre, 'success');
          console.log(resp);
          this.cargarUsuarios();
        });
      }
    });
  }
}
