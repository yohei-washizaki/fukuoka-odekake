import { describe, it, expect } from 'vitest';
import { buildPrompt } from '../builder.js';

describe('buildPrompt', () => {
    it('generates correct prompt with all options', () => {
        const result = buildPrompt({
            mood: 'active',
            area: '天神',
            budget: 'medium',
            duration: 'long',
        });
        expect(result).toContain('アクティブな体験を求めている');
        expect(result).toContain('天神');
        expect(result).toContain('1000円から5000円で');
        expect(result).toContain('一日中楽しめる');
    });
});
