import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';

const BAD_MONGO_ERROR = 'Bad entity id';
const PIPE_PARAM_ERROR = 'This pipe only works with param';

export class MongoIdValidationPipe implements PipeTransform {
 transform(value: string, { type }: ArgumentMetadata) {
   if (type !== 'param') {
     throw new Error(PIPE_PARAM_ERROR);
   }

   if (!Types.ObjectId.isValid(value)) {
     throw new BadRequestException(BAD_MONGO_ERROR);
   }

   return value;
 }
}
