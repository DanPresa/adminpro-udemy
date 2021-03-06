import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsuarioService } from '../../services/service.index';

import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
  usuario: Usuario;
  constructor( private router: Router, private _usuarioService: UsuarioService ) { }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
  }

  logOut() {
    this._usuarioService.logOut();
    this.router.navigate(['/login']);
  }

}
