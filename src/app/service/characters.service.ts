import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Characters, ApiResponse } from '../characters.interface';

@Injectable({
  providedIn: 'root'
})

export class CharacterService {
  private apiUrl = 'http://localhost:8080/api/character'; 

  constructor(private http: HttpClient) { }

  getAllCharacters(page:number){
    return this.http.get(`${this.apiUrl}?page=${page}`);
  }

  getCharacterById(id: number): Observable<Characters> {
    return this.http.get<Characters>(`${this.apiUrl}/${id}`);
  }

  getCharactersByIds(ids: number[]): Observable<Characters[]> {
    const idString = ids.join(',');
    return this.http.get<Characters[]>(`${this.apiUrl}/id?ids=${idString}`);
  }

  getFilteredCharacters(name?: string, status?: string, species?: string, type?: string, gender?: string, page?: number): Observable<ApiResponse> {
    let params = new HttpParams();

    if (name) {
      params = params.append('name', name);
    }
  
    if (status) {
      params = params.append('status', status);
    }
  
    if (species) {
      params = params.append('species', species);
    }
  
    if (type) {
      params = params.append('type', type);
    }
  
    if (gender) {
      params = params.append('gender', gender);
    }
  
    if (page) {
      params = params.append('page', page.toString());
    }
  
    return this.http.get<ApiResponse>(`${this.apiUrl}/filter`, { params }).pipe(
      catchError(error => {
        if (error.status === 500) {
          console.error('Error 500: Internal Server Error (No se encontro personaje)');
          return of({ results: [], info: {count: 0, pages: 0, next: '', prev: ''}} as ApiResponse);
        } else {
          console.error('Error HTTP:', error);
          return of({ results: [], info: {count: 0, pages: 0, next: '', prev: ''}} as ApiResponse);
        }
      })
    );
  }
}
