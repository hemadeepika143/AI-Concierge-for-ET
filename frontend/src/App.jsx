import React, { useState, useRef, useEffect } from 'react';
import { Send, User, ChevronRight, Lightbulb, TrendingUp, Cpu } from 'lucide-react';

export default function App() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      content: "Hello! I am your AI Concierge for ET. How can I assist you with your finances, investing, or learning today?",
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const QUICK_OPTIONS = [
    "Student",
    "Investor",
    "Learn Investing",
    "Save Money"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: text }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      const botMsg = { id: Date.now() + 1, sender: 'bot', content: data.reply };
      setMessages((prev) => [...prev, botMsg]);

    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [...prev, {
        id: Date.now() + 1,
        sender: 'bot',
        content: "Sorry, I'm having trouble connecting right now. Please try again later.",
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Simple heuristic parser for structured output
  const renderBotMessage = (content) => {
    // Check if the response matches our requested structure
    const hasProfile = content.toLowerCase().includes('1. user profile') || content.toLowerCase().includes('user profile:');
    const hasRecs = content.toLowerCase().includes('2. recommendations') || content.toLowerCase().includes('recommendations:');
    
    if (hasProfile || hasRecs) {
      // Split the structured message
      const profileMatch = content.match(/(?:1\.\s*User Profile:?|User Profile:?)\s*([\s\S]*?)(?:2\.\s*Recommendations:?|Recommendations:?)/i);
      const recsMatch = content.match(/(?:2\.\s*Recommendations:?|Recommendations:?)\s*([\s\S]*?)(?:3\.\s*Suggestions:?|Suggestions:?)/i);
      const suggMatch = content.match(/(?:3\.\s*Suggestions:?|Suggestions:?)\s*([\s\S]*?)$/i);

      if (profileMatch) {
        return (
          <div className="structured-output">
            <div className="card profile-card">
              <div className="card-title">
                <User size={16} /> User Profile
              </div>
              <div className="card-content">
                {profileMatch[1].trim()}
              </div>
            </div>

            {recsMatch && (
              <div className="card recommendations-card">
                <div className="card-title">
                  <TrendingUp size={16} /> Recommendations
                </div>
                <div className="card-content">
                  {recsMatch[1].trim()}
                </div>
              </div>
            )}

            {suggMatch && (
              <div className="card suggestions-card">
                <div className="card-title">
                  <Lightbulb size={16} /> Suggestions
                </div>
                <div className="card-content">
                  {suggMatch[1].trim()}
                </div>
              </div>
            )}
          </div>
        );
      }
    }

    // Fallback if the format wasn't exactly respected
    return <div className="message-bubble">{content}</div>;
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <Cpu className="text-primary" style={{ color: "var(--primary)" }} />
        <h1>AI Concierge</h1>
      </header>

      {/* Chat Area */}
      <div className="chat-container">
        {messages.map((msg) => (
          <div key={msg.id} className={`message-wrapper ${msg.sender}`}>
            {msg.sender === 'user' ? (
              <div className="message-bubble">{msg.content}</div>
            ) : (
              renderBotMessage(msg.content)
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="message-wrapper bot">
            <div className="typing-indicator">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Options */}
      <div className="quick-options">
        {QUICK_OPTIONS.map((option, index) => (
          <button 
            key={index} 
            className="quick-btn"
            onClick={() => handleSendMessage(option)}
            disabled={isLoading}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <div className="input-area">
        <form 
          className="input-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputMessage);
          }}
        >
          <input
            type="text"
            className="input-field"
            placeholder="Type your message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className="send-btn"
            disabled={!inputMessage.trim() || isLoading}
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
