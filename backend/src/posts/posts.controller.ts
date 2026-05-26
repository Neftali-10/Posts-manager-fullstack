import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { BulkPostDto } from './dto/bulk-post.dto';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
  ) {}

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

   @Post()
  create(
    @Body() createPostDto: CreatePostDto,
  ) {
    return this.postsService.create(
      createPostDto,
    );
  }

  @Post('bulk')
  bulkCreate(
    @Body()
    posts: BulkPostDto[],
  ) {
    return this.postsService.bulkCreate(
      posts,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,

    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.update(
      id,
      updatePostDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}