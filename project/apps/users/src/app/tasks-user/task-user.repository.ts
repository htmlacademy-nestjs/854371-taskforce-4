import { CRUDRepository } from '@project/util/util-types';
import TaskUserEntity from './task-user.entity';
import { UserInterface } from '@project/shared/app-types';
import { InjectModel } from '@nestjs/mongoose';
import { TaskUserModel } from './task-user.model';
import { Model } from 'mongoose';

export class TaskUserRepository implements CRUDRepository<TaskUserEntity, string, UserInterface> {
  constructor(
    @InjectModel(TaskUserModel.name) private taskUserModel: Model<TaskUserModel>
  ) {
  }

  async findById(id: string): Promise<UserInterface | null> {
    return this.taskUserModel.findById(id);
  }

  async create(entity: TaskUserEntity): Promise<UserInterface> {
    const newUser = new this.taskUserModel(entity);
    return newUser.save();
  }

  async remove(id: string): Promise<void> {
    this.taskUserModel.findByIdAndDelete(id);
  }

  async update(id: string, entity: TaskUserEntity): Promise<UserInterface> {
    return this.taskUserModel.findByIdAndUpdate(id, entity.toObject(), { new: true })
      .exec();
  }

  async findByEmail(email: string): Promise<UserInterface | null> {
    return this.taskUserModel.findOne({ email })
      .exec();
  }
}
