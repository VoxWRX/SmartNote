"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateNoteDto = exports.CreateNoteDto = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const zod_1 = require("zod");
const CreateNoteSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required'),
    content: zod_1.z.string(),
    isLocked: zod_1.z.boolean().optional().default(false),
    password: zod_1.z.string().optional(),
    folderId: zod_1.z.string().uuid().optional(),
    tags: zod_1.z.array(zod_1.z.string().uuid()).optional(),
});
class CreateNoteDto extends (0, nestjs_zod_1.createZodDto)(CreateNoteSchema) {
}
exports.CreateNoteDto = CreateNoteDto;
const UpdateNoteSchema = CreateNoteSchema.partial();
class UpdateNoteDto extends (0, nestjs_zod_1.createZodDto)(UpdateNoteSchema) {
}
exports.UpdateNoteDto = UpdateNoteDto;
//# sourceMappingURL=notes.dto.js.map