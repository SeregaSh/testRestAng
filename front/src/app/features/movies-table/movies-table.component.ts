import { Component, DestroyRef, inject } from '@angular/core';
import { MoviesService } from '../../shared/services/movies.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MovieDialogComponent } from '../movie-dialog/movie-dialog.component';
import { MatButton } from '@angular/material/button';

const HEAD_LABELS = ['Film Name', 'Genre', 'Released', 'Image', 'Action'];
const RENDERED_KEYS = ['name', 'genre', 'release', 'image', 'action'];

@Component({
  selector: 'app-movies-table',
  standalone: true,
  templateUrl: './movies-table.component.html',
  styleUrl: './movies-table.component.scss',
  imports: [CommonModule, MatDialogModule, MatButton]
})
export class MoviesTableComponent {
  private destroyRef = inject(DestroyRef);

  movies$ = this.moviesService.movies$.pipe(takeUntilDestroyed(this.destroyRef));

  public readonly KEYS_TO_RENDER = RENDERED_KEYS;

  public readonly HEADS = HEAD_LABELS;

  constructor(private readonly moviesService: MoviesService,
    private readonly dialog: MatDialog
  ) {}

  openCreateMovieModal() {
    const dialogRef = this.dialog.open(MovieDialogComponent, { width: '500px' });
    dialogRef.afterClosed().subscribe((shouldOpenNext) => {
      this.moviesService.getMovies().subscribe();
    });
  }

  openEditMovieModal(id: string) {
    const dialogRef = this.dialog.open(MovieDialogComponent, {
      width: '500px',
      data: { id }
    });
    dialogRef.afterClosed().subscribe((shouldOpenNext) => {
      this.moviesService.getMovies().subscribe();
    });
  }

  deleteMovie(id: string) {
    this.moviesService.deleteMovie(id).subscribe({
      next: () => {
        this.moviesService.getMovies().subscribe();
      }
    });
  }
}
