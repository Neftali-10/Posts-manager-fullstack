import {
  IsEmail,
  IsNotEmpty,
} from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  postId!: string;

  @IsNotEmpty()
  name!: string;

  @IsEmail()
  email!: string;

  @IsNotEmpty()
  body!: string;
}