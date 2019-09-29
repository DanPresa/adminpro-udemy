import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class AlertaService {
  constructor() {}

  mostrarAlerta( tipo: any, titulo: string, texto?: string, tiempo?: number ) {
    Swal.fire({
      type: tipo,
      title: titulo,
      text: texto,
      timer: tiempo
    });
  }
}
