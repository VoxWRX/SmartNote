import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const CreateNoteSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string(),
  isLocked: z.boolean().optional().default(false),
  password: z.string().optional(),
  folderId: z.string().uuid().optional(),
  tags: z.array(z.string().uuid()).optional(),
});

export class CreateNoteDto extends createZodDto(CreateNoteSchema) {}

const UpdateNoteSchema = CreateNoteSchema.partial();

export class UpdateNoteDto extends createZodDto(UpdateNoteSchema) {}
