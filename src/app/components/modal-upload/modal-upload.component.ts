import { Component, OnInit } from '@angular/core';

import { SubirArchivoService, ModalUploadService } from '../../services/service.index';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {
  imagenSubir: File;
  imagenTemp: any;

  constructor(
    private _subirArchivoService: SubirArchivoService,
    public _modaluploadService: ModalUploadService
  ) {
    console.log('Modal Component Listo');
  }

  ngOnInit() {
  }

  cerrarModal() {
    this.imagenTemp = null;
    this.imagenSubir = null;
    this._modaluploadService.ocultarModal();
  }

  seleccionImagen( archivo: File ) {
    // console.log(archivo);
    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }

    if ( archivo.type.indexOf('image') < 0 ) {
      /* this._alertaService.mostrarAlerta('error', 'Solo imagenes', 'El archivo seleccionado no es una imagen'); */
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => {
      this.imagenTemp = reader.result;
    };
  }

  subirImagen() {
    this._subirArchivoService.subirArchivo(this.imagenSubir, this._modaluploadService.tipo, this._modaluploadService.id)
    .then((resp) => {
      console.log(resp);
      this._modaluploadService.notificacion.emit( resp );
      this.cerrarModal();
    })
    .catch((err) => {
      console.log('Error en la carga');
    });
  }

}
