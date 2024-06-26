import { Component, OnInit } from '@angular/core';
import { MoviesTableComponent } from './features/movies-table/movies-table.component';
import { MoviesService } from './shared/services/movies.service';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [MoviesTableComponent, CommonModule, SpinnerComponent]
})
export class AppComponent implements OnInit {
  constructor(private readonly moviesService: MoviesService) {}

  ngOnInit() {
    this.moviesService.getMovies().subscribe();
    this.moviesService.getMoviesTypes().subscribe();
  }
}
