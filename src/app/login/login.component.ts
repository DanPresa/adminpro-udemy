import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Usuario } from '../models/usuario.model';
import { UsuarioService, AlertaService } from '../services/service.index';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginComponent implements OnInit {
  recuerdame: boolean = false;
  email: string = '';

  auth2: any;

  constructor(
    private router: Router,
    private _usuarioService: UsuarioService,
    private _alertaService: AlertaService
  ) { }

  ngOnInit() {
    this.googleInit();

    this.email = localStorage.getItem('email') || '';
    if ( localStorage.getItem('email') ) {
      this.recuerdame = true;
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '291727215101-nbf2rdvgg7coss7atrlnt95eh5qpmr0j.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin( document.getElementById('btnGoogle') );
    });
  }

  attachSignin( element ) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      // let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;

      this._usuarioService.loginGoogle(token).subscribe((resp) => window.location.href = '/dashboard');
    });
  }

  ingresar( form: NgForm ) {
    if ( !form.valid ) {
      this._alertaService.mostrarAlerta('warning', 'Hay errores en los campos');

      return;
    }

    let usuario = new Usuario(
      null,
      form.value.email,
      form.value.password
    );

    this._usuarioService.login( usuario, form.value.recuerdame ).subscribe((resp) => this.router.navigate(['/dashboard']));
  }

}
