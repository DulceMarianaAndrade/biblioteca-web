import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LibrosService, Libro } from '../../services/libros';

@Component({
  selector: 'app-inicio',
  imports: [RouterLink],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class Inicio implements OnInit {
  librosService = inject(LibrosService);
  libros = signal<Libro[]>([]);

  ngOnInit() {
    this.librosService.getLibros().subscribe({
      next: (data) => this.libros.set(data.slice(0, 15)),
      error: () => {}
    });
  }
}