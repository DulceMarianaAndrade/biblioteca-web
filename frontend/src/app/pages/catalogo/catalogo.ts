import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importación de CommonModule para usar directivas comunes como *ngIf y *ngFor
import { LibrosService, Libro } from '../../services/libros';
import { CarritoService } from '../../services/carrito';
import { LibroCard } from '../../components/libro-card/libro-card';

interface Imagen {
  url: string;
  categoria: string;
}

@Component({
  selector: 'app-catalogo',
  imports: [CommonModule, LibroCard],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css'
})
export class Catalogo implements OnInit {
  //USO DE SIGNALS PARA MANEJAR EL ESTADO DE LOS LIBROS, CARGA Y ERRORES
  libros = signal<Libro[]>([]);
  cargando = signal(true);
  error = signal('');
  categoriaSeleccionada = 'todas';

  librosService = inject(LibrosService);
  carritoService = inject(CarritoService);

  ngOnInit() {
    // Uso de HttpClient, Observable y subscribe()
    this.librosService.getLibros().subscribe({
      //USO DE OBSERVABLES PARA OBTENER LOS LIBROS DESDE EL SERVICIO
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

  imagenes: Imagen[] = [
    {url: 'assets/libro1.jpg', categoria: 'novelas'},
    {url: 'assets/libro2.jpg', categoria: 'novelas'},
    {url: 'assets/libro3.jpg', categoria: 'novelas'},
    {url: 'assets/libro4.jpg', categoria: 'novelas'},
    {url: 'assets/libro5.jpg', categoria: 'novelas'},
    {url: 'assets/libro6.jpg', categoria: 'novelas'},
    {url: 'assets/libro7.jpg', categoria: 'novelas'},
    {url: 'assets/libro8.jpg', categoria: 'novelas'},
    {url: 'assets/libro9.jpg', categoria: 'novelas'},
    {url: 'assets/libro10.jpg', categoria: 'novelas'},
    {url: 'assets/libro11.jpg', categoria: 'cienciaficcion'},
    {url: 'assets/libro12.jpg', categoria: 'cienciaficcion'},
    {url: 'assets/libro13.jpg', categoria: 'cienciaficcion'},
    {url: 'assets/libro14.jpg', categoria: 'cienciaficcion'},
    {url: 'assets/libro15.jpg', categoria: 'cienciaficcion'},
    {url: 'assets/libro16.jpg', categoria: 'cienciaficcion'},
    {url: 'assets/libro17.jpg', categoria: 'cienciaficcion'},
    {url: 'assets/libro18.jpg', categoria: 'cienciaficcion'},
    {url: 'assets/libro19.jpg', categoria: 'cienciaficcion'},
    {url: 'assets/libro20.jpg', categoria: 'cienciaficcion'},
    {url: 'assets/libro21.jpg', categoria: 'SuperacionPersonal'},
    {url: 'assets/libro22.jpg', categoria: 'SuperacionPersonal'},
    {url: 'assets/libro23.jpg', categoria: 'SuperacionPersonal'},
    {url: 'assets/libro24.jpg', categoria: 'SuperacionPersonal'},
    {url: 'assets/libro25.jpg', categoria: 'SuperacionPersonal'},
    {url: 'assets/libro26.jpg', categoria: 'SuperacionPersonal'},
    {url: 'assets/libro27.jpg', categoria: 'SuperacionPersonal'},
    {url: 'assets/libro28.jpg', categoria: 'SuperacionPersonal'},
    {url: 'assets/libro29.jpg', categoria: 'SuperacionPersonal'},
    {url: 'assets/libro30.jpg', categoria: 'SuperacionPersonal'},
  ];

  filtrarCategoria(categoria: string) {
    this.categoriaSeleccionada = categoria;
  }

  librosFiltrados() {
    if (this.categoriaSeleccionada === 'todas') {
      return this.libros();
    }
    return this.libros().filter(libro =>
      libro.categoria.toLowerCase() === this.categoriaSeleccionada
    );
  }
}