import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, UpperCasePipe, TitleCasePipe, NgClass } from '@angular/common';
import { Libro } from '../../services/libros';

@Component({
  selector: 'app-libro-card',
  imports: [RouterLink, CurrencyPipe, UpperCasePipe, TitleCasePipe, NgClass],
  templateUrl: './libro-card.html',
  styleUrl: './libro-card.css'
})
export class LibroCard {
  // USO DE @Input() - recibe el libro desde el componente padre catalogo
  @Input() libro!: Libro;

  // USO DE @Output() - emite evento al padre cuando se agrega al carrito
  @Output() agregarAlCarrito = new EventEmitter<Libro>();

  agregar() {
    this.agregarAlCarrito.emit(this.libro);
  }
}