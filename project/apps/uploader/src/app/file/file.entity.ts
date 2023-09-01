import { Entity } from '@project/util/util-types';
import { FileInterface } from '@project/shared/app-types';

export class FileEntity implements Entity<FileEntity, FileInterface> {
  public id: string;
  public originalName: string;
  public size: number;
  public hashName: string;
  public path: string;
  public mimetype: string;

  constructor(file: FileInterface) {
    this.fillEntity(file);
  }

  public fillEntity(file: FileInterface) {
    this.id = file.id;
    this.originalName = file.originalName;
    this.size = file.size;
    this.hashName = file.hashName;
    this.path = file.path;
    this.mimetype = file.mimetype;
  }

  public toObject(): FileEntity {
    return ({
      ...this
    });
  }
}
