import { GoogleGenAI } from '@google/genai';
import config from '../config/config.js';

const ai = new GoogleGenAI({ apiKey: config.geminiApiKey });

const promptAi = async (promptMessage) => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: promptMessage,
        });

        return response.text;
    } catch (error) {
        console.error("Gemini API Error:", error);
        throw error;
    }
};

export default promptAi;