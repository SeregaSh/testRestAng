export type TMovie = {
    _id: string;
    name: string;
    genre: string;
    release: string;
    image: string;
}

export type TMovieNew = Omit<TMovie, '_id'>;

export type TMovieEdit = Partial<TMovie>;

export type TMovieType = {
    _id: string;
    value: string;
    type: string;
}

export enum EMovieDialogTitles {
    newMovie = 'New Movie',
    editMovie = 'Edit Movie'
}

// export type TMovie = Omit<TMovieResponse, '_id'>;