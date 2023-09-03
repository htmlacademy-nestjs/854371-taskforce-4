import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';

const BAD_MONGO_ERROR = 'Bad entity id';

export class MongoIdValidationPipe implements PipeTransform {
 transform(value: string, { type }: ArgumentMetadata) {
   if (type !== 'param') {
     throw new Error('This pipe only works with param');
   }

   if (!Types.ObjectId.isValid(value)) {
     throw new BadRequestException(BAD_MONGO_ERROR);
   }

   return value;
 }
}
