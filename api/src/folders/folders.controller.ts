import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../auth/current-user.decorator';

@UseGuards(AuthGuard('jwt'))
@Controller('folders')
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}

  @Post()
  create(@CurrentUser() user: any, @Body('name') name: string) {
    return this.foldersService.create(user.id, name);
  }

  @Get()
  findAll(@CurrentUser() user: any) {
    return this.foldersService.findAll(user.id);
  }

  @Patch(':id')
  update(@CurrentUser() user: any, @Param('id') id: string, @Body('name') name: string) {
    return this.foldersService.update(id, user.id, name);
  }

  @Delete(':id')
  remove(@CurrentUser() user: any, @Param('id') id: string) {
    return this.foldersService.remove(id, user.id);
  }
}
