import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LibrosService, Libro } from '../../services/libros';

@Component({
  selector: 'app-inicio',
  imports: [RouterLink, CommonModule],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class Inicio implements OnInit {
  //USO DE SIGNAL para manejar la lista de libros destacados
  librosService = inject(LibrosService);
  libros = signal<Libro[]>([]);

  ngOnInit() {
    //USO DE OBSERVABLES PARA OBTENER LOS LIBROS DESDE EL SERVICIO
    this.librosService.getLibros().subscribe({
      next: (data) => this.libros.set(data.slice(0, 15)),
      error: () => {}
    });
  }
}