import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie } from './movie.model';
import { MovieType } from './movieType.model';

@Injectable()
export class MoviesService {

  constructor(@InjectModel('Movie') private readonly movieModel: Model<Movie>, 
    @InjectModel('Type') private readonly movieType: Model<MovieType>,) {}

  async create(data: CreateMovieDto): Promise<string> {
    try {
      const newMovie = new this.movieModel({
        name: data.name,
        genre: data.genre,
        release: data.release,
        image: data.image,
      });
  
      const movie = await newMovie.save();
      return movie._id;
    } catch(err) {
      throw(err);
    }
  }

  async findAll(): Promise<Movie[]> {
    try {
      const movies = await this.movieModel.find().exec();
      return movies as Movie[];
    } catch(err) {
      throw(err);
    }
  }

  async findOne(id: string): Promise<Movie> {
    try {
      const movie = await this.movieModel.findById(id);
      return movie;
    } catch(err) {
      throw(err);
    }
  }

  async update(id: string, updateMovieData: UpdateMovieDto): Promise<string> {
    try {
      const movie = await this.movieModel.findByIdAndUpdate(id, updateMovieData);
      return movie._id;
    } catch(err) {
      throw(err);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.movieModel.deleteOne({ _id: id });
    } catch(err) {
      throw(err);
    }
  }

  async getTypes(): Promise<MovieType[]> {
    const types = await this.movieType.find().exec();
    return types as MovieType[];
  }
}


