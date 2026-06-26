import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesModule } from './notes/notes.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { AiModule } from './ai/ai.module';
import { FoldersModule } from './folders/folders.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [NotesModule, PrismaModule, AuthModule, AiModule, FoldersModule, TagsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
