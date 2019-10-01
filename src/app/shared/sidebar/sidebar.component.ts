import { Component, OnInit } from '@angular/core';

import { UsuarioService, SidebarService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  usuario: Usuario;
  menu: any[] = [];

  constructor( private _sidebarService: SidebarService, public _usuarioService: UsuarioService ) { }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;

    this.menu = this._sidebarService.menu;
  }

}
