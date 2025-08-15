import GoogleGenerativeAI from "@google/genai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("API Key not found. Please set NEXT_PUBLIC_GEMINI_API_KEY in your .env file.");
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * Calls Google Gemini API with a given prompt and returns a JSON object.
 * @param {string} prompt
 * @returns {Promise<object>} AI response parsed as a JSON object
 */
export async function GenerateCourseLayout_AI(prompt) {
  try {
    // For structured JSON, it's often better to stream the response
    const result = await model.generateContentStream({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json", // Correctly request JSON output
      },
    });

    let responseText = '';
    for await (const chunk of result.stream) {
      responseText += chunk.text();
    }

    // Parse the accumulated text string into a JSON object
    return JSON.parse(responseText);

  } catch (error) {
    console.error("Error generating course layout from AI:", error);
    // Return a structured error object so the frontend knows what happened
    return { error: "Failed to generate course layout. Please try again." };
  }
}