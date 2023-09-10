import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';
import { CommentValidationMessages, CommentValidationParameters } from '@project/shared/app-validation';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty({message: CommentValidationMessages.TEXT_EMPTY})
  @MinLength(CommentValidationParameters.TEXT_MIN_LENGTH, {message: CommentValidationMessages.TEXT_MIN_LENGTH})
  @MaxLength(CommentValidationParameters.TEXT_MAX_LENGTH, {message: CommentValidationMessages.TEXT_MAX_LENGTH})
  public message: string;

  @IsNumber()
  @IsNotEmpty()
  public taskId: number;
}
