import { NotesService } from './notes.service';
import { CreateNoteDto, UpdateNoteDto } from './dto/notes.dto';
export declare class NotesController {
    private readonly notesService;
    constructor(notesService: NotesService);
    create(user: any, createNoteDto: CreateNoteDto): Promise<{
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
    findAll(user: any): Promise<({
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
    findOne(user: any, id: string): Promise<{
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
    update(user: any, id: string, updateNoteDto: UpdateNoteDto): Promise<{
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
    remove(user: any, id: string): Promise<{
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
