import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { TagMessages, TagParameters } from '@project/shared/app-validation';

export class CreateTagDto {
  @IsString()
  @MinLength(TagParameters.TAG_MIN_LENGTH, {
    message: TagMessages.TAG_TITLE_MIN_LENGTH_NOT_VALID,
  })
  @MaxLength(TagParameters.TAG_MAX_LENGTH, {
    message: TagMessages.TAG_TITLE_MAX_LENGTH_NOT_VALID,
  })
  @Matches(TagParameters.TAG_REGULAR_EXPRESSION_CHECK, {
    message: TagMessages.TAG_TITLE_REGULAR_EXPRESSION_CHECK_NOT_VALID,
  })
  title: string;
  tags: string;
}
