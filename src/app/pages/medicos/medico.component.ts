import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { MedicoService, HospitalesService, AlertaService, ModalUploadService } from '../../services/service.index';
import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {
  medico: Medico = new Medico('', '', '', '', '');
  hospitales: Hospital[] = [];
  hospital: Hospital = new Hospital('');

  constructor(
    private _alertaService: AlertaService,
    private _modalUploadService: ModalUploadService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _medicoService: MedicoService,
    private _hospitalService: HospitalesService
  ) {
    this.activatedRoute.params.subscribe((param) => {
      let id = param.id;

      if ( id !== 'nuevo' ) {
        this.obtenerMedico( id );
      }
    });
  }

  ngOnInit() {
    this._hospitalService.cargarHospitales().subscribe((resp) => {
      this.hospitales = resp.hospitales;
    });

    this._modalUploadService.notificacion.subscribe((resp) => {
      console.log(resp);
      this.medico.img = resp.medico.img;
    });
  }

  guardarMedico( f: NgForm ) {
    this._medicoService.guardarMedico( this.medico ).subscribe((resp) => {
      console.log(resp);
      this.medico._id = resp.medico._id;
      this.router.navigate(['/medico', resp.medico._id]);
    });
  }

  obtenerMedico( id: string ) {
    this._medicoService.obtenerMedico( id ).subscribe((medico) => {
      this.medico = medico;
      this.medico.hospital = medico.hospital._id;
      this.cambioHospital(this.medico.hospital);
    });
  }

  cambioHospital( id: string ) {
    this._hospitalService.obtenerHospital( id ).subscribe((hospital) => this.hospital = hospital);
  }

  cambiarFoto() {
    this._modalUploadService.mostrarModal( 'medicos', this.medico._id );
  }

}
