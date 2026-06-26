import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, data: { name: string, color?: string }) {
    return this.prisma.tag.create({
      data: { name: data.name, color: data.color, userId }
    });
  }

  async findAll(userId: string) {
    return this.prisma.tag.findMany({
      where: { userId },
      orderBy: { name: 'asc' }
    });
  }

  async findOne(id: string, userId: string) {
    const tag = await this.prisma.tag.findFirst({
      where: { id, userId },
      include: {
        _count: {
          select: { notes: true }
        }
      }
    });
    if (!tag) throw new NotFoundException('Tag not found');
    return tag;
  }

  async update(id: string, userId: string, data: { name: string, color?: string }) {
    await this.findOne(id, userId);
    return this.prisma.tag.update({
      where: { id },
      data: { name: data.name, color: data.color }
    });
  }

  async remove(id: string, userId: string) {
    const tag = await this.findOne(id, userId);
    if (tag._count.notes > 0) {
      throw new BadRequestException('Cannot delete tag. It is currently assigned to ' + tag._count.notes + ' note(s).');
    }
    return this.prisma.tag.delete({
      where: { id }
    });
  }
}
