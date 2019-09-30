import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen/imagen.pipe';

@NgModule({
  declarations: [
    ImagenPipe
  ],
  exports: [
    ImagenPipe
  ]
})
export class PipesModule { }
