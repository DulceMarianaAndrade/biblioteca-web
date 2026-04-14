import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

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
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  //USO DE SERVICIOS Y HTTPCLIENT: Aqui se definen los metodos para consumir la API REST del backend (GET, POST)
  getLibros(): Observable<Libro[]> { //GET /productos y uso de OBSERVABLES PARA OBTENER LOS LIBROS DESDE EL SERVICIO
    return this.http.get<Libro[]>(`${this.apiUrl}/productos`);
  }

  getLibroPorId(id: number): Observable<Libro> {// GET /productos/:id
    return this.http.get<Libro>(`${this.apiUrl}/productos/${id}`);
  }

  agregarLibro(libro: any): Observable<any> {// POST /productos
    return this.http.post(`${this.apiUrl}/productos`, libro);
  }

  enviarMensaje(mensaje: Mensaje): Observable<any> {// POST /productos/contacto
    return this.http.post(`${this.apiUrl}/productos/contacto`, mensaje);
  }
}