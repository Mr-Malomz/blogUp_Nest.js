import { Controller, Post, Res, Body, HttpStatus, Get, Param, NotFoundException, Put, Delete } from '@nestjs/common';
import { BlogService } from './blog.service';
import { Response } from 'express';
import { CreatePostDTO } from './dto/create-post.dto';

@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  //create post endpoint
  @Post()
  async createPost(@Res() response: Response, @Body() createPostDTO: CreatePostDTO){
      const post = await this.blogService.createPost(createPostDTO);
      return response.status(HttpStatus.OK).json({
          message: 'Post has been created successfully',
          data: post
      })
  };

  //get a single post
  @Get(':postID')
  async getPost(@Res() response: Response, @Param('postID') postID: string) {
      const post = await this.blogService.getPost(postID);
      if (!post) {
          throw new NotFoundException('Queried Post does not exist');
      }
      return response.status(HttpStatus.OK).json(post);
  }

  //get all post
  @Get('')
  async getAllPost(@Res() response: Response) {
      const posts = await this.blogService.getAllPost();
      return response.status(HttpStatus.OK).json(posts);
  }

  //edit a post
  @Put(':postID')
  async editPost(@Res() response: Response, @Param('postID') postID: string, @Body() createPostDTO: CreatePostDTO) {
      const post = await this.blogService.editPost(postID, createPostDTO);
      if(!post) {
          throw new NotFoundException('Post does not exist')
      }
      return response.status(HttpStatus.OK).json({
        message: 'Post has been updated successfully',
        data: post,
      });
  }

  //delete a post
  @Delete(':postID')
  async deletePost(@Res() response: Response, @Param('postID') postID: string){
      const post = await this.blogService.deletePost(postID);
      if (!post) {
          throw new NotFoundException('Post does not exist');
      }
      return response.status(HttpStatus.OK).json({
        message: 'Post has been deleted!',
        data: post,
      });
  }

}
