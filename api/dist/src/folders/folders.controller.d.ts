import { FoldersService } from './folders.service';
export declare class FoldersController {
    private readonly foldersService;
    constructor(foldersService: FoldersService);
    create(user: any, name: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        name: string;
    }>;
    findAll(user: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        name: string;
    }[]>;
    update(user: any, id: string, name: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        name: string;
    }>;
    remove(user: any, id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        name: string;
    }>;
}
