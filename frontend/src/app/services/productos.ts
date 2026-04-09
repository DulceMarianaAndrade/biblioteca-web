import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class ProductosService {
  private API = 'http://localhost:3000/productos';
  constructor(private http: HttpClient) {}
  getProductos() {
    return this.http.get<any[]>(this.API);
  }
}
