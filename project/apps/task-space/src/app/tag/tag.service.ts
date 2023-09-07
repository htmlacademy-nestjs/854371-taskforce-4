import { TagRepository } from './tag-repository';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagEntity } from './tag.entity';
import { Injectable } from '@nestjs/common';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagService {
  constructor(
    private readonly tagRepository: TagRepository
  ) {}

  async createTag(tag: CreateTagDto) {
    const newTag = new TagEntity(tag);
    return this.tagRepository.create(newTag);
  }

  async deleteTag(id: number) {
    return this.tagRepository.remove(id);
  }

  async updateTag(id: number, tag: UpdateTagDto) {
    return this.tagRepository.update(id, new TagEntity(tag));
  }

  async getTag(id: number) {
    return this.tagRepository.findById(id);
  }

  async getTagByName(tagName: string) {
    return this.tagRepository.findByTagName(tagName);
  }
}
