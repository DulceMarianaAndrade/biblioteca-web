import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Libro {
  id: number;
  nombre: string;
  categoria: string;
  autor: string;
  edicion: string;
  precio: number;
  stock: number;
  imagen: string;
  descripcion: string;
  disponibilidad: boolean;
}

export interface Mensaje {
  nombre: string;
  correo: string;
  asunto: string;
  mensaje: string;
}

@Injectable({ providedIn: 'root' })
export class LibrosService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getLibros(): Observable<Libro[]> {
    return this.http.get<Libro[]>(`${this.apiUrl}/productos`);
  }

  getLibroPorId(id: number): Observable<Libro> {
    return this.http.get<Libro>(`${this.apiUrl}/productos/${id}`);
  }

  agregarLibro(libro: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/productos`, libro);
  }

  enviarMensaje(mensaje: Mensaje): Observable<any> {
    return this.http.post(`${this.apiUrl}/productos/contacto`, mensaje);
  }
}