import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, CommonModule } from '@angular/common'; // Importa CommonModule para usar ngIf y ngFor en el template
import { CarritoService } from '../../services/carrito';

@Component({
  selector: 'app-carrito',
  imports: [RouterLink, CurrencyPipe, CommonModule],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css'
})
export class Carrito {
  carritoService = inject(CarritoService);
}