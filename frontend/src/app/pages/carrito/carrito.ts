import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CarritoService } from '../../services/carrito';

@Component({
  selector: 'app-carrito',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css'
})
export class Carrito {
  carritoService = inject(CarritoService);
}