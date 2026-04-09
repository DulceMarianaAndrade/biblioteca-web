import { Component, signal } from '@angular/core';
import { Catalogo } from './catalogo/catalogo';

@Component({
  selector: 'app-root',
  imports: [Catalogo],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
