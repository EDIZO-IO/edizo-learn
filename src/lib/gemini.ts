import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const geminiModel = genAI.getGenerativeModel({ model: 'gemini-pro' });

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export async function generateAIResponse(
  prompt: string,
  context?: string
): Promise<string> {
  try {
    const fullPrompt = context 
      ? `Context: ${context}\n\nUser Question: ${prompt}`
      : prompt;

    const result = await geminiModel.generateContent(fullPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error('Failed to generate AI response');
  }
}

export async function generateQuizQuestions(
  topic: string,
  difficulty: 'easy' | 'medium' | 'hard',
  count: number = 5
): Promise<any[]> {
  try {
    const prompt = `Generate ${count} multiple choice questions about ${topic} with ${difficulty} difficulty. 
    Return as JSON array with structure: 
    [{"question": "...", "options": ["a", "b", "c", "d"], "correct": 0, "explanation": "..."}]`;

    const result = await geminiModel.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON from response
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    throw new Error('Invalid response format');
  } catch (error) {
    console.error('Quiz generation error:', error);
    throw new Error('Failed to generate quiz questions');
  }
}

export async function explainCode(code: string, language: string): Promise<string> {
  try {
    const prompt = `Explain this ${language} code in simple terms, including what it does and how it works:

${code}`;

    const result = await geminiModel.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Code explanation error:', error);
    throw new Error('Failed to explain code');
  }
}