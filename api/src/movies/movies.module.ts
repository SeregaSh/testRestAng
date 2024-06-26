import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieSchema } from './movie.model';
import { MovieTypeSchema } from './movieType.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Movie', schema: MovieSchema }, { name: 'Type', schema: MovieTypeSchema }])],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
