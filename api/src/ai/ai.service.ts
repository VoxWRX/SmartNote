import { Injectable, NotImplementedException } from '@nestjs/common';

export enum AILocalProvider {
  OLLAMA = 'ollama',
  LMSTUDIO = 'lmstudio',
  GEMINI = 'gemini',
  OPENAI = 'openai',
}

@Injectable()
export class AiService {
  async summarizeNote(content: string, provider: AILocalProvider = AILocalProvider.GEMINI) {
    switch (provider) {
      case AILocalProvider.OLLAMA:
        // Implementation for local Ollama HTTP API (e.g. http://localhost:11434/api/generate)
        throw new NotImplementedException('Ollama integration not fully implemented yet.');
      case AILocalProvider.LMSTUDIO:
        // Implementation for local LMStudio Server (OpenAI compatible endpoint)
        throw new NotImplementedException('LMStudio integration not fully implemented yet.');
      case AILocalProvider.GEMINI:
        // Implementation for Google Gemini API via @google/genai
        throw new NotImplementedException('Gemini integration not fully implemented yet.');
      case AILocalProvider.OPENAI:
        // Implementation for OpenAI API
        throw new NotImplementedException('OpenAI integration not fully implemented yet.');
      default:
        throw new Error('Unsupported AI Provider');
    }
  }

  async semanticSearch(query: string, userId: string) {
    // Vector search logic over notes using embeddings
    return [];
  }
}
