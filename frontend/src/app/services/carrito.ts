import { Injectable, signal, computed } from '@angular/core';
import { Libro } from './libros';

export interface ItemCarrito {
  libro: Libro;
  cantidad: number;
}

@Injectable({ providedIn: 'root' })
export class CarritoService {
  //USO DE SIGNALS PARA MANEJAR EL ESTADO DE LOS ITEMS EN EL CARRITO, TOTAL DE PRODUCTOS Y TOTAL A PAGAR
  items = signal<ItemCarrito[]>([]);

  totalProductos = computed(() =>
    this.items().reduce((acc, i) => acc + i.cantidad, 0)
  );

  total = computed(() =>
    this.items().reduce((acc, i) => acc + i.libro.precio * i.cantidad, 0)
  );

  agregar(libro: Libro, cantidad: number = 1) {
    const actual = this.items();
    const existe = actual.find(i => i.libro.id === libro.id);

    if (existe) {
      const nuevaCantidad = existe.cantidad + cantidad;

      // validar stock
      if (nuevaCantidad > libro.stock) return;

      this.items.set(actual.map(i =>
        i.libro.id === libro.id
          ? { ...i, cantidad: nuevaCantidad }
          : i
      ));
    } else {
      this.items.set([...actual, { libro, cantidad }]);
    }
  }

  quitarUno(id: number) {
    const actual = this.items();
    const item = actual.find(i => i.libro.id === id);
    if (!item) return;
    if (item.cantidad === 1) {
      this.items.set(actual.filter(i => i.libro.id !== id));
    } else {
      this.items.set(actual.map(i =>
        i.libro.id === id ? { ...i, cantidad: i.cantidad - 1 } : i
      ));
    }
  }

  quitar(id: number) {
    this.items.set(this.items().filter(i => i.libro.id !== id));
  }

  limpiar() {
    this.items.set([]);
  }

  obtenerProductosParaCompra() {
    return this.items().map(i => ({
      id: i.libro.id,
      cantidad: i.cantidad
    }));
  }

  obtenerCantidadPorLibro(id: number): number {
    const item = this.items().find(i => i.libro.id === id);
    return item ? item.cantidad : 0;
  }
}