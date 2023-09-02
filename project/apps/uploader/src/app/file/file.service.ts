import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { uploaderConfig } from '@project/config/config-uploader';
import { ConfigType } from '@nestjs/config';
import { ensureDir } from 'fs-extra';
import { writeFile } from 'node:fs/promises';
import { extension } from 'mime-types';
import dayjs from 'dayjs';
import { FileRepository } from './file.repository';
import { FileEntity } from './file.entity';
import { FileInterface } from '@project/shared/app-types';
import * as crypto from 'crypto';

type WritedFile = {
  hashName: string;
  fileExtension: string;
  subDirectory: string;
  path: string;
}

@Injectable()
export class FileService {
  constructor(
    @Inject(uploaderConfig.KEY)
    private readonly applicationConfig: ConfigType<typeof uploaderConfig>,
    private readonly fileRepository: FileRepository
  ) {
  }

  public async writeFile(file: Express.Multer.File): Promise<WritedFile> {
    const [ year, month ] = dayjs().format('YYYY MM').split(' ');
    const { uploadDirectory } = this.applicationConfig;

    const subDirectory = `${year}/${month}`;
    const uuid = crypto.randomUUID();
    const fileExtension = extension(file.mimetype) ?? '.txt';
    const hashName = `${uuid}.${fileExtension}`;

    const uploadDirectoryPath = `${uploadDirectory}/${subDirectory}`;
    const destinationFile = `${uploadDirectoryPath}/${hashName}`;

    await ensureDir(uploadDirectoryPath);
    await writeFile(destinationFile, file.buffer);

    return {
      hashName,
      fileExtension: fileExtension as string,
      subDirectory,
      path: destinationFile
    };
  }

  public async save(file: Express.Multer.File) {
    const writedFile = await this.writeFile(file);
    const newFile = new FileEntity({
      size: file.size,
      hashName: writedFile.hashName,
      mimetype: file.mimetype,
      originalName: file.originalname,
      path: writedFile.path,
    });

    return this.fileRepository.create(newFile);
  }

  public async getFile(fileId: string): Promise<FileInterface> {
    const existFile = await this.fileRepository.findById(fileId);

    if (!existFile) {
      throw new NotFoundException(`File with id ${fileId} not found`);
    }

    return existFile;
  }
}
