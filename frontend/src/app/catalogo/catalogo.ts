import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../services/productos';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo implements OnInit{
  productos: any[] = [];

  constructor(private productosService: ProductosService) {}

  ngOnInit() {
    console.log("CATALOGO CARGADO"); // 👈 prueba
    this.productosService.getProductos().subscribe(data => {
      console.log(data);
      this.productos = data;
    });
  }
}
