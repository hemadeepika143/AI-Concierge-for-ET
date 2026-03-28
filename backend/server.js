import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/chat', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    // Mock response for prototype demonstration if API key is not configured
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
      const lowerMsg = message.toLowerCase();
      let mockReply = '';

      if (lowerMsg.includes('student') || lowerMsg.includes('learn')) {
        mockReply = `1. User Profile
- Beginner / Student

2. Recommendations
- Read our 'Investing 101' guide
- Start a mock stock portfolio
- Track your monthly allowances

3. Suggestions
- Check the 'Learn Investing' module
- Set up a small recurring savings account`;
      } else if (lowerMsg.includes('investor') || lowerMsg.includes('market')) {
        mockReply = `1. User Profile
- Active Investor

2. Recommendations
- Diversify into index funds
- Monitor daily market trends on ET
- Review tech and green energy stocks

3. Suggestions
- Use our advanced portfolio tracker
- Read premium ET market analysis`;
      } else {
         // Default for 'save money', 'cash flow', etc.
         mockReply = `1. User Profile
- Finance Optimizer

2. Recommendations
- Start tracking basic cash flow and expenses
- Set a strict 50/30/20 budget
- Set up an emergency fund

3. Suggestions
- Link your bank accounts for automated tracking
- Read ET articles on tax saving tools`;
      }
      
      // Artificial delay to simulate AI response time
      await new Promise(resolve => setTimeout(resolve, 1500));
      return res.json({ reply: mockReply });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: `You are an AI financial concierge. Understand the user and respond in structured format with:
1. User Profile
2. Recommendations
3. Suggestions
Keep it simple and beginner-friendly.`
    });

    const result = await model.generateContent(message);
    const reply = result.response.text();
    
    // Minimal parsing
    res.json({ reply });
  } catch (error) {
    console.error('Error with Gemini API:', error);
    res.status(500).json({ error: 'Something went wrong while fetching the response.' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
