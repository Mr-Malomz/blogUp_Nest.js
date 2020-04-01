import { Document } from 'mongoose';

export interface Post extends Document {
    readonly author: string,
    readonly avatar: string,
    readonly title: string,
    readonly uri: string,
    readonly createdAt: string
}