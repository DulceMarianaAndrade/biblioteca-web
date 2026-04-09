import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LibrosService } from '../../services/libros';

@Component({
  selector: 'app-agregar',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './agregar.html',
  styleUrl: './agregar.css'
})
export class Agregar {
  fb = inject(FormBuilder);
  librosService = inject(LibrosService);

  enviado = signal(false);
  error = signal('');

  form = this.fb.group({
    nombre: ['', Validators.required],
    categoria: ['', Validators.required],
    autor: ['', Validators.required],
    edicion: ['', Validators.required],
    precio: [null, [Validators.required, Validators.min(1)]],
    stock: [null, [Validators.required, Validators.min(0)]],
    imagen: ['', Validators.required],
    descripcion: ['', Validators.required],
    disponibilidad: [true]
  });

  get f() {
    return this.form.controls;
  }

  guardar() {
    if (this.form.invalid) return;
    this.librosService.agregarLibro(this.form.value).subscribe({
      next: () => {
        this.enviado.set(true);
        this.form.reset({ disponibilidad: true });
      },
      error: () => {
        this.error.set('Hubo un error al guardar el libro.');
      }
    });
  }
}