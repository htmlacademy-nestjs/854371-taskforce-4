import { TaskAddress, TaskDescription, TaskTitle } from './task-space-validation-parametrs';

export const TaskSpaceMessages = {
  TASK_COAST_NOT_VALID: 'Task\'s cost must be equal or greater than 0',
  TASK_DESCRIPTION_EMPTY_NOT_VALID: 'Task\'s description is empty',
  TASK_DESCRIPTION_MAX_LENGTH_NOT_VALID: `Task's description is too long (max ${TaskTitle.MAX_LENGTH})`,
  TASK_DESCRIPTION_MIN_LENGTH_NOT_VALID: `Task's description is too short (min ${TaskDescription.MIN_LENGTH})`,
  TASK_DUE_DATE_NOT_VALID: 'Task\'s due date is not valid',
  TASK_IMAGE_NOT_VALID: 'Task\'s image is max size 1MB',
  TASK_TAGS_NOT_VALID: 'Task\'s tags are not valid. Max count: 5, minlength: 1, maxlength: 10, without #. First symbol must be alphebetical',
  TASK_TITLE_EMPTY_NOT_VALID: 'Task\'s title is empty',
  TASK_TITLE_MAX_LENGTH_NOT_VALID: `Task's title is too long (max ${TaskTitle.MAX_LENGTH})`,
  TASK_TITLE_MIN_LENGTH_NOT_VALID: `Task's title is too short (min ${TaskTitle.MIN_LENGTH})`,
  TASK_ADDRESS_MIN_LENGTH_NOT_VALID: `Task's address is too short (min ${TaskAddress.MIN_LENGTH})`,
  TASK_ADDRESS_MAX_LENGTH_NOT_VALID: `Task's address is too long (max ${TaskAddress.MAX_LENGTH})`
} as const;
