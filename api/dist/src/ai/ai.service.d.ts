export declare enum AILocalProvider {
    OLLAMA = "ollama",
    LMSTUDIO = "lmstudio",
    GEMINI = "gemini",
    OPENAI = "openai"
}
export declare class AiService {
    summarizeNote(content: string, provider?: AILocalProvider): Promise<void>;
    semanticSearch(query: string, userId: string): Promise<never[]>;
}
