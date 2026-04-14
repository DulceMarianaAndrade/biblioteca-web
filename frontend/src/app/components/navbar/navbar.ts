import { CommonModule } from '@angular/common'; //USO DE CommonModule PARA USAR DIRECTIVAS COMO *ngIf 
import { Component, inject,} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CarritoService } from '../../services/carrito';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  carrito = inject(CarritoService);
}