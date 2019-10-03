import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { MedicoService, ModalUploadService } from '../../services/service.index';
import { Medico } from '../../models/medico.model';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {
  medicos: Medico[] = [];
  cargando: boolean = true;
  totalRegistros: number = 0;
  p: number = 1;
  items: string = '5';

  constructor( private _modalUploadService: ModalUploadService, private _medicoService: MedicoService ) { }

  ngOnInit() {
    this.cargarMedicos();
    this.items = localStorage.getItem('itempages') || '5';

    this._modalUploadService.notificacion.subscribe((resp) => this.cargarMedicos());
  }

  mostrarItems( itemsPerPages: string ) {
    this.items = itemsPerPages;
    localStorage.setItem('itempages', itemsPerPages);
  }

  cargarMedicos() {
    this.cargando = true;
    this._medicoService.cargarMedicos().subscribe((resp) => {
      // console.log(resp);
      this.medicos = resp.medicos;
      this.totalRegistros = resp.totalMedicos;
      this.cargando = false;
    });
  }

  buscarMedico( termino: string ) {
    if ( termino.length === 0 ) {
      this.cargarMedicos();

      return;
    }

    this._medicoService.buscarMedico( termino ).subscribe((resp) => this.medicos = resp);
  }

  borrarMedico( medico: Medico ) {
    Swal.fire({
      title: 'Are you sure?',
      text: medico.nombre,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlo!',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {
        this._medicoService.borrarMedico( medico ).subscribe((resp) => {
          Swal.fire(
            resp.mensaje,
            resp.medico.nombre,
            'success'
          );
          this.cargarMedicos();
        });
      }
    });
  }

}
