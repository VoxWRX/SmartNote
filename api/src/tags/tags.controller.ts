import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TagsService } from './tags.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../auth/current-user.decorator';

@UseGuards(AuthGuard('jwt'))
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  create(@CurrentUser() user: any, @Body() body: { name: string, color?: string }) {
    return this.tagsService.create(user.id, body);
  }

  @Get()
  findAll(@CurrentUser() user: any) {
    return this.tagsService.findAll(user.id);
  }

  @Patch(':id')
  update(@CurrentUser() user: any, @Param('id') id: string, @Body() body: { name: string, color?: string }) {
    return this.tagsService.update(id, user.id, body);
  }

  @Delete(':id')
  remove(@CurrentUser() user: any, @Param('id') id: string) {
    return this.tagsService.remove(id, user.id);
  }
}
