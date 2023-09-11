import { Document } from 'mongoose';
import { UserInterface, UserRole } from '@project/shared/app-types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { City } from '@prisma/client';

@Schema({
  collection: 'users',
  timestamps: true,
})
export class TaskUserModel extends Document implements UserInterface {
  @Prop()
  public aboutMe: string;

  @Prop({
    type: Number
  })
  public ageInYears: number;

  @Prop({
    required: true
  })
  public avatar: string;

  @Prop({
    required: true
  })
  public birthDay: Date;

  @Prop({
    type: String,
    required: true,
    default: 'Moscow'
  })
  public city: City;

  @Prop({
    default: 0
  })
  public completedTasksCount: number;

  @Prop({
    default: 0
  })
  public failedTasksCount: number;

  @Prop({
    required: true
  })
  public email: string;

  @Prop({
    required: true
  })
  public name: string;

  @Prop({
    required: true
  })
  public passwordHash: string;

  @Prop({
    required: true
  })
  public rating: number;

  @Prop({
    default: 0
  })
  public ratingPosition: number;

  @Prop({
    required: true
  })
  public regDate: string;

  @Prop({
    required: true,
    type: String,
    enum: UserRole,
    default: UserRole.Executor,
  })
  public role: UserRole;

  @Prop()
  public specialization: string;
}

export const TaskUserSchema = SchemaFactory.createForClass(TaskUserModel);
