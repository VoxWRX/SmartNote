"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiService = exports.AILocalProvider = void 0;
const common_1 = require("@nestjs/common");
var AILocalProvider;
(function (AILocalProvider) {
    AILocalProvider["OLLAMA"] = "ollama";
    AILocalProvider["LMSTUDIO"] = "lmstudio";
    AILocalProvider["GEMINI"] = "gemini";
    AILocalProvider["OPENAI"] = "openai";
})(AILocalProvider || (exports.AILocalProvider = AILocalProvider = {}));
let AiService = class AiService {
    async summarizeNote(content, provider = AILocalProvider.GEMINI) {
        switch (provider) {
            case AILocalProvider.OLLAMA:
                throw new common_1.NotImplementedException('Ollama integration not fully implemented yet.');
            case AILocalProvider.LMSTUDIO:
                throw new common_1.NotImplementedException('LMStudio integration not fully implemented yet.');
            case AILocalProvider.GEMINI:
                throw new common_1.NotImplementedException('Gemini integration not fully implemented yet.');
            case AILocalProvider.OPENAI:
                throw new common_1.NotImplementedException('OpenAI integration not fully implemented yet.');
            default:
                throw new Error('Unsupported AI Provider');
        }
    }
    async semanticSearch(query, userId) {
        return [];
    }
};
exports.AiService = AiService;
exports.AiService = AiService = __decorate([
    (0, common_1.Injectable)()
], AiService);
//# sourceMappingURL=ai.service.js.map