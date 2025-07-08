import { buildPrompt } from "../prompts/builder.js";
import { getFukuokaSuggestions } from "../gpt/client.js";
import { get } from "http";

export function runSuggestCommand(options: {
    mood?: string;
    area?: string;
    budget?: string;
    duration?: string;
}){
    console.log("福岡おでかけ提案");
    console.log(`気分: ${options.mood || 'relax'}`);
    console.log(`エリア: ${options.area || 'hakata'}`);
    console.log(`予算: ${options.budget || 'medium'}`);
    console.log(`所要時間: ${options.duration || 'medium'}`);

    const prompt = buildPrompt({
        mood: options.mood,
        area: options.area,
        budget: options.budget,
        duration: options.duration
    });
    console.log("生成されたプロンプト:");
    console.log(prompt);

    getFukuokaSuggestions(prompt)
        .then(suggestions => {
            console.log("提案されたプラン:");
            console.log(suggestions);
        })
        .catch(error => {
            console.error("提案の取得中にエラーが発生しました:", error);
        });
}
