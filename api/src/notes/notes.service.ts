import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNoteDto, UpdateNoteDto } from './dto/notes.dto';

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, data: CreateNoteDto) {
    return this.prisma.note.create({
      data: {
        title: data.title,
        content: data.content,
        isLocked: data.isLocked,
        password: data.password,
        folderId: data.folderId,
        userId,
        tags: data.tags ? {
          connect: data.tags.map(id => ({ id }))
        } : undefined,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.note.findMany({
      where: { userId },
      include: { tags: true, folder: true },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async findOne(id: string, userId: string) {
    const note = await this.prisma.note.findFirst({
      where: { id, userId },
      include: { tags: true, folder: true },
    });
    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }
    return note;
  }

  async update(id: string, userId: string, data: UpdateNoteDto) {
    await this.findOne(id, userId); // Ensure it exists and belongs to user
    return this.prisma.note.update({
      where: { id },
      data: {
        title: data.title,
        content: data.content,
        isLocked: data.isLocked,
        password: data.password,
        folderId: data.folderId,
        tags: data.tags ? {
          set: data.tags.map(tagId => ({ id: tagId }))
        } : undefined,
      },
    });
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);
    return this.prisma.note.delete({
      where: { id },
    });
  }
}
