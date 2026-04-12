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
  //USO DE SIGNALS PARA MANEJAR EL ESTADO DEL LIBRO, CARGA, ERRORES Y AGREGADO AL CARRITO
  libro = signal<Libro | null>(null);
  cargando = signal(true);
  error = signal('');
  agregado = signal(false);

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

  agregarAlCarrito() {
    const libro = this.libro();
    if (libro) {
      this.carritoService.agregar(libro);
      this.agregado.set(true);
      setTimeout(() => this.agregado.set(false), 2000);
    }
  }
}