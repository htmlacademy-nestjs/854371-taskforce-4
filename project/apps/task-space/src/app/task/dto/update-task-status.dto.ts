import { Status } from "@prisma/client";
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateTaskStatusDto {
  @IsEnum(Status)
  @IsNotEmpty()
  public status: Status
}
