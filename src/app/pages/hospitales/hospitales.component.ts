import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { AlertaService, HospitalesService, ModalUploadService } from '../../services/service.index';
import { Hospital } from 'src/app/models/hospital.model';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {
  hospital: Hospital;
  hospitales: Hospital[] = [];
  totalRegistros: number = 0;
  cargando: boolean = true;
  p: number = 1;
  items: string = '5';

  constructor(
    private _alertaService: AlertaService,
    private _modalUploadService: ModalUploadService,
    private _hospitalesService: HospitalesService,
  ) { }

  ngOnInit() {
    this.cargarHospitales();
    this.items = localStorage.getItem('itempages') || '5';

    this._modalUploadService.notificacion.subscribe((resp) => this.cargarHospitales());
  }

  mostrarItems( itemsPerPages: string ) {
    this.items = itemsPerPages;
    localStorage.setItem('itempages', itemsPerPages);
  }

  mostrarModal( hospital: Hospital ) {
    this._modalUploadService.mostrarModal( 'hospitales', hospital._id );
  }

  cargarHospitales() {
    this.cargando = true;
    this._hospitalesService.cargarHospitales().subscribe((resp) => {
      this.hospitales = resp.hospitales;
      this.totalRegistros = resp.totalHospitales;
      this.cargando = false;
    });
  }

  crearHospital() {
    Swal.fire({
      title: 'Nombre de hospital',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if ( result.value ) {
        let hospital = new Hospital(result.value);

        this._hospitalesService.crearHospital( hospital ).subscribe((resp) => {
          if ( resp.ok ) {
            Swal.fire({
              type: 'success',
              title: resp.mensaje,
              text: resp.hospital.nombre
            });

            this.cargarHospitales();
          }
        });
      }
    });
  }

  guardarHospital( hospital: Hospital ) {
    this._hospitalesService.crearHospital( hospital ).subscribe((resp) => this._alertaService.mostrarAlerta('success', resp.mensaje, resp.hospital.nombre));
  }

  borrarHospital( hospital: Hospital ) {
    Swal.fire({
      title: 'Está seguro de borrar a?',
      text: hospital.nombre,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!',
      cancelButtonText: 'No, cancelar!'
    }).then((result) => {
      if (result.value) {
        this._hospitalesService.borrarHospital( hospital ).subscribe((resp) => {
          this._alertaService.mostrarAlerta('success', resp.mensaje, resp.hospital.nombre);
          this.cargarHospitales();
        });
      }
    });
  }

  buscarHospital( termino: string ) {
    if ( termino.length === 0 ) {
      this.cargarHospitales();
      return;
    }

    this._hospitalesService.buscarHospital( termino ).subscribe((resp) => this.hospitales = resp.hospitales);
  }
}
