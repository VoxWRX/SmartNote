import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto, UpdateNoteDto } from './dto/notes.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../auth/current-user.decorator';
import { ZodValidationPipe } from 'nestjs-zod';

@Controller('notes')
@UseGuards(AuthGuard('jwt'))
@UsePipes(ZodValidationPipe)
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@CurrentUser() user: any, @Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(user.userId, createNoteDto);
  }

  @Get()
  findAll(@CurrentUser() user: any) {
    return this.notesService.findAll(user.userId);
  }

  @Get(':id')
  findOne(@CurrentUser() user: any, @Param('id') id: string) {
    return this.notesService.findOne(id, user.userId);
  }

  @Patch(':id')
  update(@CurrentUser() user: any, @Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(id, user.userId, updateNoteDto);
  }

  @Delete(':id')
  remove(@CurrentUser() user: any, @Param('id') id: string) {
    return this.notesService.remove(id, user.userId);
  }
}
