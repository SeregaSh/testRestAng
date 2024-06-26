import { NgIf, NgStyle } from '@angular/common';
import { Component, DestroyRef, Inject, inject } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MoviesService } from '../../shared/services/movies.service';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { TDialogData } from '../../shared/types/dialog-data.type';
import { BehaviorSubject } from 'rxjs';
import { TMovie, EMovieDialogTitles } from '../../shared/types/movie.type';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DropdownComponent } from '../../shared/components/dropdown/dropdown.component';
import { MatDialogActions, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatButton, MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-movie-dialog',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogContent,
    MatDialogActions,
    MatFormFieldModule,
    NgStyle,
    DropdownComponent,
    NgIf,
    MatButton,
    MatDialogTitle,
    MatButtonModule
  ],
  templateUrl: './movie-dialog.component.html',
  styleUrl: './movie-dialog.component.scss'
})
export class MovieDialogComponent {
  form = this.fb.group({
    name: new FormControl('', [Validators.required]),
    genre: new FormControl('', [Validators.required]),
    release: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
  });

  title = EMovieDialogTitles.newMovie;

  private destroyRef = inject(DestroyRef);

  movieId = this.data?.id;

  isNewMovieSubject$ = new BehaviorSubject<boolean>(true);
  isNewMovie$ = this.isNewMovieSubject$.asObservable();

  moviesTypesOptions$ = this.moviesService.moviesTypes$.pipe(takeUntilDestroyed(this.destroyRef));

  defaultImageSrc = 'https://via.placeholder.com/150';

  constructor(
    private fb: FormBuilder,  
    private moviesService: MoviesService,
    @Inject(DIALOG_DATA) public readonly data: TDialogData,
    private readonly dialogRef: DialogRef
  ) {}

  ngOnInit() {
    if(this.data?.id) {
      this.title = EMovieDialogTitles.editMovie;
      this.isNewMovieSubject$.next(false);
      this.moviesService.getOneMovie(this.data.id).subscribe({
        next: (movie) => {
          this.updateFormWithData(movie);
        }
      });
    }
  }

  onSaveMovie() {
    let saveCall;
    const movieData = {
      name: this.form.value.name as string,
      genre: this.form.value.genre as string,
      release: this.form.value.release as string,
      image: this.form.value.image || this.defaultImageSrc as string,
    };
    saveCall = this.movieId ? 
    this.moviesService.updateMovie(this.movieId, movieData) : this.moviesService.createMovie(movieData);

    saveCall.subscribe({
      next: () => {
        this.onClose(true);
      }
    });
  }

  onClose(param?: boolean) {
    this.dialogRef.close(param);
  }

  private updateFormWithData(movie: TMovie): void {
    this.form.markAsPristine();
    this.form.setValue({
      name: movie.name,
      genre: movie.genre,
      release: movie.release,
      image: movie.image,
    });
  }
}