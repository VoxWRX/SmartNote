"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TagsService = class TagsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, data) {
        return this.prisma.tag.create({
            data: { name: data.name, color: data.color, userId }
        });
    }
    async findAll(userId) {
        return this.prisma.tag.findMany({
            where: { userId },
            orderBy: { name: 'asc' }
        });
    }
    async findOne(id, userId) {
        const tag = await this.prisma.tag.findFirst({
            where: { id, userId },
            include: {
                _count: {
                    select: { notes: true }
                }
            }
        });
        if (!tag)
            throw new common_1.NotFoundException('Tag not found');
        return tag;
    }
    async update(id, userId, data) {
        await this.findOne(id, userId);
        return this.prisma.tag.update({
            where: { id },
            data: { name: data.name, color: data.color }
        });
    }
    async remove(id, userId) {
        const tag = await this.findOne(id, userId);
        if (tag._count.notes > 0) {
            throw new common_1.BadRequestException('Cannot delete tag. It is currently assigned to ' + tag._count.notes + ' note(s).');
        }
        return this.prisma.tag.delete({
            where: { id }
        });
    }
};
exports.TagsService = TagsService;
exports.TagsService = TagsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TagsService);
//# sourceMappingURL=tags.service.js.map