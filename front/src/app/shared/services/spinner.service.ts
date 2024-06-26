import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  isMoviesLoadingSubject$ = new BehaviorSubject<boolean>(false);
  isMoviesLoading$ = this.isMoviesLoadingSubject$.asObservable();

  isMovieTypeLoadingSubject$ = new BehaviorSubject<boolean>(false);
  isMovieTypeLoading$ = this.isMovieTypeLoadingSubject$.asObservable();

  isLoadingSubject$ = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject$.asObservable();

  constructor() {
    combineLatest([this.isMoviesLoading$, this.isMovieTypeLoading$]).subscribe(([isMoviesLoading, isMoviesTypeLoading]) => {
      this.isLoadingSubject$.next(isMoviesLoading || isMoviesTypeLoading);
    });
  }
}