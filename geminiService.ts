
import { GoogleGenAI } from "@google/genai";

// Initialize the GoogleGenAI client with a named parameter.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getStoryNarration = async (levelTitle: string, charName: string) => {
  try {
    // Correctly call generateContent directly on ai.models.
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{
        parts: [{
          text: `You are the narrator for an adventure game called "Lost City Explorers". 
      The character ${charName} has just entered the level "${levelTitle}". 
      Provide a short, 2-sentence atmospheric description in Hindi and English. No violence. Keep it magical and curious.`
        }]
      }],
    });
    // Use the .text property directly instead of a method.
    return response.text;
  } catch (error) {
    console.error("AI Narration Error:", error);
    return "Adventure awaits! Explore the ruins cautiously.";
  }
};
