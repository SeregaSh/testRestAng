import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { TMovie, TMovieEdit, TMovieNew, TMovieType } from '../types/movie.type';
import { MoviesApiService } from './movies-api.service';
import { SpinnerService } from './spinner.service';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private moviesSubject$ = new BehaviorSubject<TMovie[]>([]);
  public movies$ = this.moviesSubject$.asObservable();

  private moviesTypesSubject$ = new BehaviorSubject<TMovieType[]>([]);
  public moviesTypes$ = this.moviesTypesSubject$.asObservable();

  constructor(private moviesApiService: MoviesApiService, private spinnerService: SpinnerService) { }

  getMovies(): Observable<TMovie[]> {
    this.spinnerService.isMoviesLoadingSubject$.next(true);
    return this.moviesApiService.getMoviesApiRequest()
      .pipe(
        tap(movies => {
          this.moviesSubject$.next(movies);
          this.spinnerService.isMoviesLoadingSubject$.next(false);
        }),
        catchError((err) => {
          this.spinnerService.isMoviesLoadingSubject$.next(false);
          return throwError(err);
        })
      );
  }

  getOneMovie(id: string): Observable<TMovie> {
    return this.moviesApiService.getOneMovieApiRequest(id);
  }

  updateMovie(id: string, data: TMovieEdit) {
    return this.moviesApiService.updateMovieApiRequest(id, data);
  }

  createMovie(data: TMovieNew) {
    return this.moviesApiService.addMovieApiRequest(data);
  }

  deleteMovie(id: string): Observable<void> {
    this.spinnerService.isMoviesLoadingSubject$.next(true);
    return this.moviesApiService.deleteMovieApiRequest(id)
      .pipe(
        tap(() => {
          this.spinnerService.isMoviesLoadingSubject$.next(false);
        }),
        catchError((err) => {
          this.spinnerService.isMoviesLoadingSubject$.next(false);
          return throwError(err);
        })
      );
  }

  getMoviesTypes(): Observable<TMovieType[]> {
    this.spinnerService.isMovieTypeLoadingSubject$.next(true);
    return this.moviesApiService.getMoviesTypesApiRequest()
      .pipe(
        tap(moviesTypes => {
            this.moviesTypesSubject$.next(moviesTypes);
            this.spinnerService.isMovieTypeLoadingSubject$.next(false);
          }
        ),
        catchError((err) => {
          this.spinnerService.isMovieTypeLoadingSubject$.next(false);
          return throwError(err);
        })
      );
  }
}
