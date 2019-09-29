import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { Usuario } from '../models/usuario.model';
import { UsuarioService, AlertaService } from '../services/service.index';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class RegisterComponent implements OnInit {
  forma: FormGroup;

  constructor(
    private router: Router,
    private _usuarioService: UsuarioService,
    private _alertaService: AlertaService
  ) { }

  sonIguales( campo1: string, campo2: string ) {
    return ( group: FormGroup ) => {
      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if ( pass1 === pass2 ) {
        return null;
      }

      return {
        sonIguales: true
      };
    };
  }

  ngOnInit() {
    this.forma = new FormGroup({
      nombre: new FormControl('', Validators.required),
      correo: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      password2: new FormControl('', Validators.required),
      condiciones: new FormControl('', Validators.required)
    }, { validators: this.sonIguales('password', 'password2') });

    this.forma.setValue({
      nombre: 'test',
      correo: 'test@mail.com',
      password: '123',
      password2: '123',
      condiciones: true
    });
  }

  registarUsuario() {
    if ( !this.forma.valid ) {
      this._alertaService.mostrarAlerta('warning', 'Hay errores en los campos');
      return;
    }

    if ( !this.forma.get('condiciones').value ) {
      this._alertaService.mostrarAlerta('warning', 'Debe aceptar las condiciones!');
      return;
    }

    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password
    );

    this._usuarioService.crearUsuario( usuario ).subscribe((resp) => {
      console.log(resp);
      this.router.navigate(['/login']);
      this._alertaService.mostrarAlerta('success', 'Usuario creado!', resp.email, 2000);
    });
  }

}
