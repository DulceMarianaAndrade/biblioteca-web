import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LibrosService, Mensaje } from '../../services/libros';

@Component({
  selector: 'app-contacto',
  imports: [FormsModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css'
})
export class Contacto {
  librosService = inject(LibrosService);

  enviado = signal(false);
  error = signal('');

  mensaje: Mensaje = {
    nombre: '',
    correo: '',
    asunto: '',
    mensaje: ''
  };

  enviar() {
    if (!this.mensaje.nombre || !this.mensaje.correo || !this.mensaje.mensaje) return;
    this.librosService.enviarMensaje(this.mensaje).subscribe({
      next: () => {
        this.enviado.set(true);
        this.mensaje = { nombre: '', correo: '', asunto: '', mensaje: '' };
      },
      error: () => {
        this.error.set('Hubo un error al enviar el mensaje.');
      }
    });
  }
}