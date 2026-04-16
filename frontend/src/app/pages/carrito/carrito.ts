import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, CommonModule } from '@angular/common'; // Importa CommonModule para usar ngIf y ngFor en el template
import { CarritoService } from '../../services/carrito';
import { LibrosService } from '../../services/libros';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrito',
  imports: [RouterLink, CurrencyPipe, CommonModule],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css'
})

export class Carrito {
  carritoService = inject(CarritoService);
  librosService = inject(LibrosService);

  pagar() {
    const productos = this.carritoService.obtenerProductosParaCompra();

    this.librosService.comprar(productos).subscribe({
      next: () => {
        Swal.fire({
          title: '¡Compra exitosa!',
          text: 'Tu pedido se realizó correctamente',
          icon: 'success',
          confirmButtonText: 'OK'
        });

        this.carritoService.limpiar();
      },
      error: (err) => {
        alert(err.error?.error || 'Error al procesar la compra');
      }
    });
  }
}