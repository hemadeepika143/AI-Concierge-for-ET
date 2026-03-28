import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/chat', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    // Mock response for prototype demonstration if API key is not configured
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
      const mockReply = `1. User Profile
- Aspiring Learner / Observer

2. Recommendations
- Start tracking basic cash flow
- Read beginner articles on investing
- Explore low-risk index funds

3. Suggestions
- Use our dashboard to monitor daily tips
- Check the 'Learn Investing' module for deep dives`;
      
      // Artificial delay to simulate AI response time
      await new Promise(resolve => setTimeout(resolve, 1500));
      return res.json({ reply: mockReply });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are an AI financial concierge. Understand the user and respond in structured format with:
1. User Profile
2. Recommendations
3. Suggestions
Keep it simple and beginner-friendly.`
        },
        { role: 'user', content: message }
      ],
      temperature: 0.7,
    });

    const reply = completion.choices[0].message.content;
    
    // Minimal parsing
    res.json({ reply });
  } catch (error) {
    console.error('Error with OpenAI API:', error);
    res.status(500).json({ error: 'Something went wrong while fetching the response.' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
