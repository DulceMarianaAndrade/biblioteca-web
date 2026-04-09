import { Injectable, signal, computed } from '@angular/core';
import { Libro } from './libros';

export interface ItemCarrito {
  libro: Libro;
  cantidad: number;
}

@Injectable({ providedIn: 'root' })
export class CarritoService {
  items = signal<ItemCarrito[]>([]);

  totalProductos = computed(() =>
    this.items().reduce((acc, i) => acc + i.cantidad, 0)
  );

  total = computed(() =>
    this.items().reduce((acc, i) => acc + i.libro.precio * i.cantidad, 0)
  );

  agregar(libro: Libro) {
    const actual = this.items();
    const existe = actual.find(i => i.libro.id === libro.id);
    if (existe) {
      this.items.set(actual.map(i =>
        i.libro.id === libro.id ? { ...i, cantidad: i.cantidad + 1 } : i
      ));
    } else {
      this.items.set([...actual, { libro, cantidad: 1 }]);
    }
  }

  quitar(id: number) {
    this.items.set(this.items().filter(i => i.libro.id !== id));
  }

  limpiar() {
    this.items.set([]);
  }
}