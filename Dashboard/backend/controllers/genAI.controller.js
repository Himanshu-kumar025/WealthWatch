import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Configuration for generation output
const generationConfig = {
  temperature: 0.7,      // Controls randomness (0 = deterministic, 1 = random)
  topP: 1,               // Nucleus sampling (probability mass to consider)
  topK: 1,               // Limits to top-K predictions
  maxOutputTokens: 400,  // Limits length of the generated response
};

// Controller function to handle AI prompt requests
export const askGeminiAI = async (req, res) => {
  const { prompt } = req.body;


  const token = req.headers.authorization;
  if (!token) {
    console.error("No token provided");
    return; // Return nothing if token is missing 
  }

  const user = await User.findOne({ token });
  if (!user) {
    console.error("Unauthorized user");
    return; // Token does not match any user in the database
  }

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" }); // Validate input
  }

  try {
    // Send the prompt to Gemini model and await response
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig,
    });

    // Clean up the raw response
    const cleanText = (text) => {
      return text
        .replace(/\*\*/g, "")        // Remove bold markers (**)
        .replace(/\*/g, "")          // Remove italic markers (*)
        .replace(/^[-•]\s?/gm, "")   // Remove bullet points or dashes
        .trim();                     // Trim whitespace
    };

    // Clean and extract final response text
    const responseText = cleanText(result.response.text());

    res.status(200).json({ result: responseText });

  } catch (error) {
    return res.status(500).json({ error: "Gemini API request failed", details: error.message });
  }
};
