import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { TMovie, TMovieEdit, TMovieNew, TMovieType } from '../types/movie.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesApiService {
  private domain = environment.domain;
  
  constructor(private http: HttpClient) {}

  getMoviesApiRequest(): Observable<TMovie[]> {
    return this.http.get<TMovie[]>(`${this.domain}movies`);
  }

  getOneMovieApiRequest(id: string): Observable<TMovie> {
    return this.http.get<TMovie>(`${this.domain}movies/${id}`);
  }

  addMovieApiRequest(data: TMovieNew): Observable<string> {
    return this.http.post<string>(`${this.domain}movies`, data);
  }

  updateMovieApiRequest(id: string, data: TMovieEdit): Observable<string> {
    return this.http.patch<string>(`${this.domain}movies/${id}`, data);
  }

  deleteMovieApiRequest(movieId: string) : Observable<void> {
    return this.http.delete<void>(`${this.domain}movies/${movieId}`);
  }

  getMoviesTypesApiRequest(): Observable<TMovieType[]> {
    return this.http.get<TMovieType[]>(`${this.domain}movies/types`);
  }
}
