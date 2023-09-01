import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FileModel } from './file.model';
import { Model } from 'mongoose';
import { FileInterface } from '@project/shared/app-types';
import { FileEntity } from './file.entity';

@Injectable()
export class FileRepository {
  constructor(
    @InjectModel(FileModel.name) private readonly fileModel: Model<FileModel>,
  ) {
  }

  async create(fileItem: FileEntity): Promise<FileInterface> {
    const file = new this.fileModel(fileItem);
    return file.save();
  }

  public async findById(id: string): Promise<FileInterface | null> {
    return this.fileModel.findById(id).exec();
  }
}
