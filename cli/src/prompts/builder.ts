export function buildPrompt(options: {
    mood?: string;
    area?: string;
    budget?: string;
    duration?: string;
}): string {
    const moodMap: Record<string, string> = {
        relax: 'リラックスしたい',
        active: 'アクティブな体験を求めている',
        hungry: 'お腹がすいている',
        scenic: '美しい景色を楽しみたい',
        culture: '文化的な体験を求めている',
    };
    const budgetMap: Record<string, string> = {
        low: '1000円以下で',
        medium: '1000円から5000円で',
        high: '5000円以上で',
    };
    const durationMap: Record<string, string> = {
        short: '短時間で',
        medium: '数時間で',
        long: '一日中楽しめる',
    };

  return `ユーザーは福岡の「${options.area ?? '不明な場所'}」にいて、「${moodMap[options.mood ?? 'relax']}」気分です。\n予算は${budgetMap[options.budget ?? 'low']}、所要時間は${durationMap[options.duration ?? 'medium']}です。\nこの条件で行ける福岡のローカルスポットを1件、自然な日本語で紹介してください。\n説明は100文字以内で、やさしく語りかけるトーンでお願いします。`;
}
