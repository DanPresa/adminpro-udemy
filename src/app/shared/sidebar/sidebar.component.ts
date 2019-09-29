import { Component, OnInit } from '@angular/core';

import { UsuarioService } from '../../services/service.index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor( private router: Router, private _usuarioService: UsuarioService ) { }

  ngOnInit() {
  }

  logOut() {
    this._usuarioService.logOut();
    this.router.navigate(['/login']);
  }

}
