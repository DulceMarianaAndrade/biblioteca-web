import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { Catalogo } from './pages/catalogo/catalogo';
import { Detalle } from './pages/detalle/detalle';
import { Agregar } from './pages/agregar/agregar';
import { Carrito } from './pages/carrito/carrito';
import { Contacto } from './pages/contacto/contacto';

export const routes: Routes = [
    { path: '', component: Inicio },
    { path: 'catalogo', component: Catalogo },
    { path: 'catalogo/:id', component: Detalle },
    { path: 'agregar', component: Agregar },
    { path: 'carrito', component: Carrito },
    { path: 'contacto', component: Contacto },
    { path: '**', redirectTo: '' }
];