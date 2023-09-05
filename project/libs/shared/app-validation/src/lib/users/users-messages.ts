export const UserDtoValidateMessages = {
  AUTH_USER_EMAIL_NOT_VALID: 'User\'s email is not valid',
  AUTH_USER_DATE_BIRTH_NOT_VALID: 'User\'s date of birth is not valid',
  MIN_LENGTH_USER_NAME_NOT_VALID: 'User\'s name is too short',
  MAX_LENGTH_USER_NAME_NOT_VALID: 'User\'s name is too long',
  CITY_IS_NOT_VALID: 'User\'s city is not valid. Possible values: Moscow, Saint Petersburg, Vladivostok',
  PASSWORD_MIN_LENGTH_NOT_VALID: 'User\'s password is too short (min 6)',
  PASSWORD_MAX_LENGTH_NOT_VALID: 'User\'s password is too long (max 12)',
  ROLE_IS_NOT_VALID: 'User\'s role is not valid',
  BIRTHDAY_IS_NOT_VALID: 'User\'s birthday is not valid'
} as const
