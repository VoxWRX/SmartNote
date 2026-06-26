import { PrismaService } from '../prisma/prisma.service';
import { CreateNoteDto, UpdateNoteDto } from './dto/notes.dto';
export declare class NotesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, data: CreateNoteDto): Promise<{
        id: string;
        title: string;
        content: string;
        isLocked: boolean;
        password: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        folderId: string | null;
    }>;
    findAll(userId: string): Promise<({
        folder: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            name: string;
        } | null;
        tags: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            name: string;
            color: string | null;
        }[];
    } & {
        id: string;
        title: string;
        content: string;
        isLocked: boolean;
        password: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        folderId: string | null;
    })[]>;
    findOne(id: string, userId: string): Promise<{
        folder: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            name: string;
        } | null;
        tags: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            name: string;
            color: string | null;
        }[];
    } & {
        id: string;
        title: string;
        content: string;
        isLocked: boolean;
        password: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        folderId: string | null;
    }>;
    update(id: string, userId: string, data: UpdateNoteDto): Promise<{
        id: string;
        title: string;
        content: string;
        isLocked: boolean;
        password: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        folderId: string | null;
    }>;
    remove(id: string, userId: string): Promise<{
        id: string;
        title: string;
        content: string;
        isLocked: boolean;
        password: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        folderId: string | null;
    }>;
}
