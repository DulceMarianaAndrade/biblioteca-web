import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class GoogleBooksService {

  private baseUrl = 'https://www.googleapis.com/books/v1/volumes';
  private apiKey = 'AIzaSyDf-_T__Oo8382rlRqfukj1PtG8zQHPeCs';

  constructor(private http: HttpClient) {}

  buscarLibro(titulo: string): Observable<any> {
    return this.http.get(
      `${this.baseUrl}?q=${encodeURIComponent(titulo)}&langRestrict=es&maxResults=1&key=${this.apiKey}`
    ).pipe(
      map((res: any) => {
        const item = res.items?.[0]?.volumeInfo || null;
        if (!item) return null;

        return {
          descripcion: item.description || null,
          portada: item.imageLinks?.thumbnail || null,
          publicado: item.publishedDate?.substring(0, 4) || null,
          paginas: item.pageCount || null,
          editorial: item.publisher || null,
          autores: item.authors?.join(', ') || null,
          link: item.previewLink || null
        };
      })
    );
  }
}