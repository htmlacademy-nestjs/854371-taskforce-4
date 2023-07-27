import { CRUDRepository } from '@project/util/util-types';
import TaskUserEntity from './task-user.entity';
import { UserInterface } from '@project/shared/app-types';
import { randomUUID } from 'node:crypto'
import { Injectable } from '@nestjs/common';

@Injectable()
export default class TaskUserMemoryRepository implements CRUDRepository<TaskUserEntity, string, UserInterface> {
  private repository: Record<string, UserInterface> = {};

  public async create(item: TaskUserEntity): Promise<UserInterface> {
    const entry = {...item, id: randomUUID()}
    this.repository[entry.id] = entry;

    return entry;
  }

  public async remove(id: string): Promise<void> {
    delete this.repository[id];
  }

  public async update(id: string, item: TaskUserEntity): Promise<UserInterface | null> {
    if (this.repository[id]) {
      this.repository[id] = { ...item.toObject(), id: id }
    }

    return this.findById(id);
  }

  public async findById(id: string): Promise<UserInterface | null> {
    if (this.repository[id]) {
      return {...this.repository[id]}
    }
    return null;
  }
};
