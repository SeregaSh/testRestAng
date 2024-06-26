import * as mongoose from 'mongoose';

export const MovieSchema = new mongoose.Schema({
    name: { type: String, required: true},
    genre: { type: String, required: true},
    release: { type: Number, required: true},
    image: { type: String, required: true},
});

export interface Movie {
    _id: string;
    name: string;
    genre: string;
    release: number;
    image: string;
}