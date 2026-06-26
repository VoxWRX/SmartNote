import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FoldersService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, name: string) {
    return this.prisma.folder.create({
      data: { name, userId }
    });
  }

  async findAll(userId: string) {
    return this.prisma.folder.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' }
    });
  }

  async findOne(id: string, userId: string) {
    const folder = await this.prisma.folder.findFirst({
      where: { id, userId }
    });
    if (!folder) throw new NotFoundException('Folder not found');
    return folder;
  }

  async update(id: string, userId: string, name: string) {
    await this.findOne(id, userId);
    return this.prisma.folder.update({
      where: { id },
      data: { name }
    });
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);
    // Casading delete notes
    await this.prisma.note.deleteMany({
      where: { folderId: id, userId }
    });
    return this.prisma.folder.delete({
      where: { id }
    });
  }
}
