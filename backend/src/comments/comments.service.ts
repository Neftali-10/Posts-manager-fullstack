import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  Comment,
  CommentDocument,
} from './schemas/comment.schema';

import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name)
    private commentModel: Model<CommentDocument>,
  ) {}

  async findByPost(postId: string) {
    return this.commentModel.find({
      postId,
    });
  }

  async create(
    createCommentDto: CreateCommentDto,
  ) {
    return this.commentModel.create(
      createCommentDto,
    );
  }

  async remove(id: string) {
    return this.commentModel.findByIdAndDelete(
      id,
    );
  }
}