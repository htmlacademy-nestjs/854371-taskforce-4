import { CRUDRepository } from '@project/util/util-types';
import { TagEntity } from './tag.entity';
import { TagInterface } from '@project/shared/app-types';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TagRepository implements CRUDRepository<TagEntity, number, TagInterface> {
  constructor(
    private readonly prisma: PrismaService
  ) {}

  async create(entity: TagEntity): Promise<TagInterface> {
    return this.prisma.tags.create({
      data: { ...entity.toObject() }
    })
  }

  async remove(id: number): Promise<void> {
    await this.prisma.tags.delete({
      where: { tagId: id }
    })
  }

  async update(id: number, entity: TagEntity): Promise<TagInterface> {
    return this.prisma.tags.update({
      where: { tagId: id },
      data: { ...entity.toObject(), tagId: id }
    })
  }

  async findById(id: number): Promise<TagInterface | null> {
    return this.prisma.tags.findFirst({
      where:
        { tagId: id }
    })
  }

  async findByTagName(tagName: string): Promise<TagInterface | null> {
    return this.prisma.tags.findFirst({
      where:
        { title: tagName }
    })
  }

  async findByIds(ids: number[]): Promise<TagInterface[]> {
    return this.prisma.tags.findMany({
      where: {
        tagId: {
          in: ids
        }
      }
    })
  }
}
