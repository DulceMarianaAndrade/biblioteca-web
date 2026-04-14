import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe, TitleCasePipe, UpperCasePipe, CommonModule } from '@angular/common'; // Uso de CommonModule para ngIf y ngFors
import { LibrosService, Libro } from '../../services/libros'; //Uso de la interfaz Libro para tipar el estado del libro
import { CarritoService } from '../../services/carrito';
import { GoogleBooksService } from '../../services/google-books.service';

@Component({
  selector: 'app-detalle',
  imports: [RouterLink, CurrencyPipe, TitleCasePipe, UpperCasePipe, CommonModule],
  templateUrl: './detalle.html',
  styleUrl: './detalle.css'
})
export class Detalle implements OnInit {
  //USO DE SIGNALS PARA MANEJAR EL ESTADO DEL LIBRO, CARGA, ERRORES Y AGREGADO AL CARRITO
  libro = signal<Libro | null>(null);
  cargando = signal(true);
  error = signal('');
  agregado = signal(false);

  //SIGNAL PARA API DE GOOGLE BOOKS
  infoGoogle = signal<any>(null);

  // USO DE SIGNAL para manejar cantidad seleccionada
  cantidad = signal(1);

  route = inject(ActivatedRoute);
  librosService = inject(LibrosService);
  carritoService = inject(CarritoService);
  googleBooks = inject(GoogleBooksService);

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    //USO DE OBSERVABLES PARA OBTENER EL LIBRO DESDE EL SERVICIO
    this.librosService.getLibroPorId(id).subscribe({
      next: (data) => {
        this.libro.set(data);
        this.cargando.set(false);
        this.googleBooks.buscarLibro(data.nombre).subscribe({
          next: (info) => this.infoGoogle.set(info),
          error: () => {} // si falla Google Books, no pasa nada
        });
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