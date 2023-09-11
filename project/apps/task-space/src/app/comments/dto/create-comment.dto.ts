import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';
import { CommentValidationMessages, CommentValidationParameters } from '@project/shared/app-validation';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    description: 'The message of the comment',
    example: 'John Doe is a good guy',
    type: String,
    required: true,
    minLength: CommentValidationParameters.TEXT_MIN_LENGTH,
    maxLength: CommentValidationParameters.TEXT_MAX_LENGTH,
  })
  @IsString()
  @IsNotEmpty({message: CommentValidationMessages.TEXT_EMPTY})
  @MinLength(CommentValidationParameters.TEXT_MIN_LENGTH, {message: CommentValidationMessages.TEXT_MIN_LENGTH})
  @MaxLength(CommentValidationParameters.TEXT_MAX_LENGTH, {message: CommentValidationMessages.TEXT_MAX_LENGTH})
  public message: string;

  @ApiProperty({
    description: 'The id of the task',
    example: '1',
    type: Number,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  public taskId: number;
}
