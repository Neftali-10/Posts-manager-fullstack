import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BulkPostDto } from './dto/bulk-post.dto';
import mongoose from 'mongoose';

import {
  Post,
  PostDocument,
} from './schemas/post.schema';

import { CreatePostDto } from './dto/create-post.dto';

import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name)
    private postModel: Model<PostDocument>,
  ) {}

  async findAll() {
    return this.postModel.find().sort({
      createdAt: -1,
    });
  }

  async findOne(id: string) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new NotFoundException(
      'Invalid post id',
    );
  }

  const post =
    await this.postModel.findById(id);

  if (!post) {
      throw new NotFoundException(
        'Post not found',
      );
    }

    return post;
  }

  async create(
    createPostDto: CreatePostDto,
  ) {
    return this.postModel.create(
      createPostDto,
    );
  }

  async update(
    id: string,
    updatePostDto: UpdatePostDto,
  ) {
    return this.postModel.findByIdAndUpdate(
      id,
      updatePostDto,
      {
        new: true,
      },
    );
  }

  async remove(id: string) {
    return this.postModel.findByIdAndDelete(
      id,
    );
  }

  async bulkCreate(
  posts: BulkPostDto[],
    ) {
    return this.postModel.insertMany(posts);
  }
}