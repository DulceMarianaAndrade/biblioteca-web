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
    //USO DE ROUTING: PARAMETROS DE RUTA... El :id es un parametro que se pasa a la ruta para mostrar el detalle del libro seleccionado
    //Es una ruta dinámica que se adapta al id del libro que se quiere mostrar {path: 'catalogo/:id', component: Detalle}
    { path: 'catalogo/:id', component: Detalle },
    { path: 'agregar', component: Agregar },
    { path: 'carrito', component: Carrito },
    { path: 'contacto', component: Contacto },
    { path: '**', redirectTo: '' }
];