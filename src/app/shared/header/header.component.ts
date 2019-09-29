import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/service.index';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  constructor( private router: Router, private _usuarioService: UsuarioService ) { }

  ngOnInit() {
  }

  logOut() {
    this._usuarioService.logOut();
    this.router.navigate(['/login']);
  }

}
