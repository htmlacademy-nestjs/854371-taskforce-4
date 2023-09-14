import { FileService } from './file.service';
import { Controller, Get, Inject, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import 'multer';
import { fillObject } from '@project/util/util-core';
import { UploadedFileRdo } from './rdo/uploaded-file.rdo';
import { uploaderConfig } from '@project/config/config-uploader';
import { ConfigType } from '@nestjs/config';
import { MongoIdValidationPipe } from '@project/shared/shared-pipes';
import { ApiBody, ApiConsumes, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('files')
@Controller('files')
export class FileController {
  constructor(
    private readonly fileService: FileService,
    @Inject(uploaderConfig.KEY)
    private readonly applicationConfig: ConfigType<typeof uploaderConfig>
  ) {
  }

  @ApiResponse({
    type: UploadedFileRdo,
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File to upload',
  })
  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const newFile = await this.fileService.save(file);
    const path = `${this.applicationConfig.serveRoot}/${newFile.path}`;
    return fillObject(UploadedFileRdo, Object.assign(newFile, { path }));
  }

  @ApiResponse({
    type: UploadedFileRdo,
  })
  @ApiParam({
    name: 'fileId',
    description: 'File id. Mongo ObjectId',
    type: String,
    required: true
  })
  @Get(':fileId')
  async getFile(@Param('fileId', MongoIdValidationPipe) fileId: string) {
    const existFile = await this.fileService.getFile(fileId);
    const path = `${this.applicationConfig.serveRoot}/${existFile.path}`;
    return fillObject(UploadedFileRdo, Object.assign(existFile, { path }));
  }
}
