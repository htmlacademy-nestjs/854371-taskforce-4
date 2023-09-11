import { CommentValidationParameters } from './comment-validation.parameters';

export const CommentValidationMessages = {
  TEXT_EMPTY: 'Comment is empty',
  TEXT_MAX_LENGTH: `Comment is too long. Max length is ${CommentValidationParameters.TEXT_MAX_LENGTH}`,
  TEXT_MIN_LENGTH: `Comment is too short. Min length is ${CommentValidationParameters.TEXT_MIN_LENGTH}`,
  TASK_ID_EMPTY: 'Task id is empty'
}
