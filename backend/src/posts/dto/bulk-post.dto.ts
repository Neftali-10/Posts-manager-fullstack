import {
  IsNotEmpty,
  MinLength,
} from 'class-validator';

export class BulkPostDto {
  @IsNotEmpty()
  @MinLength(3)
  title!: string;

  @IsNotEmpty()
  @MinLength(10)
  body!: string;

  @IsNotEmpty()
  author!: string;
}