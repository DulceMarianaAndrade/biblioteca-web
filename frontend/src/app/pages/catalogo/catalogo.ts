import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { LibrosService, Libro } from '../../services/libros';
import { CarritoService } from '../../services/carrito';

@Component({
  selector: 'app-catalogo',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css'
})
export class Catalogo implements OnInit {
  libros = signal<Libro[]>([]);
  cargando = signal(true);
  error = signal('');

  librosService = inject(LibrosService);
  carritoService = inject(CarritoService);

  ngOnInit() {
    this.librosService.getLibros().subscribe({
      next: (data) => {
        this.libros.set(data);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set('No se pudieron cargar los libros.');
        this.cargando.set(false);
      }
    });
  }

  agregarAlCarrito(libro: Libro) {
    this.carritoService.agregar(libro);
  }
}