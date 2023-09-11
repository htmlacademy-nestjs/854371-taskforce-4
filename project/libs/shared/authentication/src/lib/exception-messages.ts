export const ExceptionMessages = {
  FORBIDDEN: 'For your role, the route is unavailable',
  FORBIDDEN_UPDATE: 'This entity does not belong to you',
  FORBIDDEN_RESPOND: 'You already have an active task',
  TASK_NOT_FOUND: 'Task not found',
  CONFLICT_CHOOSE: 'You cannot select this executor',
  STATUS_BAD_REQUEST: 'You do not have the right to change the status of this task or it is an invalid status change',
  EXECUTOR_TASK_INCOMPLETE_ERROR: 'The executor did not complete your task',
  MULTIPLE_REVIEWS_FOR_SINGLE_TASK_NOT_ALLOWED: 'You cannot leave more than one review for one task'
} as const
