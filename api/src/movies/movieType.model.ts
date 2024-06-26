import * as mongoose from 'mongoose';

export const MovieTypeSchema = new mongoose.Schema({
    value: { type: String, required: true},
    type: { type: String, required: true},
});

export interface MovieType {
    value: string;
    type: string;
}