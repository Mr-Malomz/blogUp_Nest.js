import * as mongoose from 'mongoose';

export const BlogSchema = new mongoose.Schema({
    author: String,
    avatar: Buffer,
    title: String,
    uri: String,
    createdAt: String
})
