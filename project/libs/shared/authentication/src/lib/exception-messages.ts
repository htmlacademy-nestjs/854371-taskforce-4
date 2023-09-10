export const ExceptionMessages = {
  FORBIDDEN: 'For your role, the route is unavailable',
  FORBIDDEN_UPDATE: 'This entity does not belong to you',
  FORBIDDEN_RESPOND: 'You already have an active task',
  TASK_NOT_FOUND: 'Task not found',
  CONFLICT_CHOOSE: 'You cannot select this executor',
  STATUS_BAD_REQUEST: 'You do not have the right to change the status of this task or it is an invalid status change',
} as const
