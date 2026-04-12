import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { LibrosService, Libro } from '../../services/libros';
import { CarritoService } from '../../services/carrito';

@Component({
  selector: 'app-detalle',
  imports: [RouterLink, CurrencyPipe, TitleCasePipe, UpperCasePipe],
  templateUrl: './detalle.html',
  styleUrl: './detalle.css'
})
export class Detalle implements OnInit {
  libro = signal<Libro | null>(null);
  cargando = signal(true);
  error = signal('');
  agregado = signal(false);
  // USO DE SIGNAL para manejar cantidad seleccionada
  cantidad = signal(1);

  route = inject(ActivatedRoute);
  librosService = inject(LibrosService);
  carritoService = inject(CarritoService);

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.librosService.getLibroPorId(id).subscribe({
      next: (data) => {
        this.libro.set(data);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set('No se pudo cargar el libro.');
        this.cargando.set(false);
      }
    });
  }

  aumentar() {
    const libro = this.libro();
    if (libro && this.cantidad() < libro.stock) {
      this.cantidad.set(this.cantidad() + 1);
    }
  }

  disminuir() {
    if (this.cantidad() > 1) {
      this.cantidad.set(this.cantidad() - 1);
    }
  }

  agregarAlCarrito() {
    const libro = this.libro();
    if (libro) {
      for (let i = 0; i < this.cantidad(); i++) {
        this.carritoService.agregar(libro);
      }
      this.agregado.set(true);
      this.cantidad.set(1);
      setTimeout(() => this.agregado.set(false), 2000);
    }
  }
}