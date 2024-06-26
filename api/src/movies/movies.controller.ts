import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './movie.model';
import { MovieType } from './movieType.model';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}
  
  @Get('/types')
  async getMoviesTypes(): Promise<MovieType[]> {
    const types = await this.moviesService.getTypes();
    return types;
  }

  @Post()
  async create(@Body() createMovieData: CreateMovieDto): Promise<string> {
    const id = await this.moviesService.create(createMovieData);
    return id;
  }

  @Get()
  async findAll(): Promise<Movie[]> {
    const movies = await this.moviesService.findAll();
    return movies;
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Movie> {
    try {
      const movie = await this.moviesService.findOne(id);
      return movie;
    } catch(err) {
      throw(err);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMovieData: UpdateMovieDto) {
    const movie = await this.moviesService.update(id, updateMovieData);
    return movie;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.moviesService.remove(id);
  }

}
