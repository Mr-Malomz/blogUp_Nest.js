import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './interfaces/post.interface';
import { CreatePostDTO } from './dto/create-post.dto';

@Injectable()
export class BlogService {
  constructor(@InjectModel('Post') private readonly postModel: Model<Post>) {}

  //create new post
  async createPost(createPostDTO: CreatePostDTO): Promise<Post> {
    const post = await new this.postModel(createPostDTO);
    return post.save();
  }

  //get a single post
  async getPost(postID: string): Promise<Post> {
    const post = await this.postModel.findById(postID).exec();
    return post;
  }

  //get all post
  async getAllPost(): Promise<Post[]> {
    const posts = await this.postModel.find().exec();
    return posts;
  }

  //edit a post
  async editPost(postID: string, createPost: CreatePostDTO): Promise<Post> {
      const postEdit = await this.postModel.findByIdAndUpdate(postID, createPost, { new: true })
      return postEdit;
  }

  //delete a post
  async deletePost(postID: string): Promise<any> {
      const postDelete = await this.postModel.findByIdAndRemove(postID);
      return postDelete;
  }

}
