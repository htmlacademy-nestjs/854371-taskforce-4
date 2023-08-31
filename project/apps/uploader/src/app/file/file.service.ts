import { Inject, Injectable } from '@nestjs/common';
import { uploaderConfig } from '@project/config/config-uploader';
import { ConfigType } from '@nestjs/config';
import { ensureDir } from 'fs-extra';
import { writeFile } from 'node:fs/promises';
import dayjs from 'dayjs';

@Injectable()
export class FileService {
  constructor(
    @Inject(uploaderConfig.KEY)
    private readonly applicationConfig: ConfigType<typeof uploaderConfig>
  ) {
  }

  public async writeFile(file: Express.Multer.File): Promise<string> {
    const [year, month] = dayjs().format('YYYY MM').split(' ');
    const { uploadDirectory } = this.applicationConfig;
    const uploadDirectoryPath = `${uploadDirectory}/${year}/${month}`;
    const uniqPartName = crypto.randomUUID();
    const fileExtension = extension();
    const destinationFile = `${uploadDirectoryPath}/${uniqPartName}_${file.originalname}`;

    await ensureDir(uploadDirectoryPath);
    await writeFile(destinationFile, file.buffer);

    return destinationFile;
    // написать
  }
}
