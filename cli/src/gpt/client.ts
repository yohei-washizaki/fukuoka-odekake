import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


export async function getFukuokaSuggestions(prompt: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "user", content: prompt },
      ],
      temperature: 0.8,
      max_tokens: 200,
    });

    const message = response.choices[0]?.message?.content?.trim() || '提案が生成できませんでした';
    return message;
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    throw error;
  }
}