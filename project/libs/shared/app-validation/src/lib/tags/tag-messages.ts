import { TagParameters } from './tag-parameters';

export const TagMessages = {
  TAG_TITLE_MAX_LENGTH_NOT_VALID: `Tag's title is too long (max ${TagParameters.TAG_MAX_LENGTH})`,
  TAG_TITLE_MIN_LENGTH_NOT_VALID: `Tag's title is too short (min ${TagParameters.TAG_MIN_LENGTH})`,
  TAG_TITLE_REGULAR_EXPRESSION_CHECK_NOT_VALID: `The tag must start with a letter`,
  TAGS_MAX_COUNT_NOT_VALID: `Max count of tags is ${TagParameters.MAX_COUNT_TAGS}`,
  TAG_IS_NOT_VALID: 'Tag is not valid'
}
