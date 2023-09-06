import { TaskInterface } from '@project/shared/app-types';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { NotifyValidationMessages } from '@project/shared/app-validation';

export class CreateSubscriberDto {
  @IsNotEmpty()
  @IsEmail({}, { message: NotifyValidationMessages.EMAIL_NOT_VALID})
  public email: string;

  @IsNotEmpty()
  @IsString({message: NotifyValidationMessages.NAME_EMPTY_NOT_VALID})
  public name: string;

  @IsNotEmpty()
  public tasks: TaskInterface[];
}
