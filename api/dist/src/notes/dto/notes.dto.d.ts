import { z } from 'zod';
declare const CreateNoteDto_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    isLocked: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    password: z.ZodOptional<z.ZodString>;
    folderId: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString>>;
}, z.core.$strip>, false>;
export declare class CreateNoteDto extends CreateNoteDto_base {
}
declare const UpdateNoteDto_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
    isLocked: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodBoolean>>>;
    password: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    folderId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    tags: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString>>>;
}, z.core.$strip>, false>;
export declare class UpdateNoteDto extends UpdateNoteDto_base {
}
export {};
