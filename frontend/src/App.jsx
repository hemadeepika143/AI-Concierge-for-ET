import React, { useState, useRef, useEffect } from 'react';
import { Send, User, ChevronRight, Lightbulb, TrendingUp, Cpu } from 'lucide-react';

export default function App() {
  const QUESTION_BANK = {
    "Start": {
      question: "Welcome to AI Concierge! Let's build your financial profile. What best describes you?",
      options: [
        { label: "Student", icon: <User size={14} /> },
        { label: "Working Professional", icon: <Cpu size={14} /> },
        { label: "Business Owner", icon: <TrendingUp size={14} /> }
      ]
    },
    "Student": [
      {
        question: "Awesome! Are you currently managing pocket money or doing an internship?",
        options: [
          { label: "Pocket Money only", icon: <ChevronRight size={14} /> },
          { label: "Internship/Part-time", icon: <ChevronRight size={14} /> },
          { label: "No income yet", icon: <ChevronRight size={14} /> }
        ]
      },
      {
        question: "What is your main financial priority right now?",
        options: [
          { label: "Save for a gadget/trip", icon: <ChevronRight size={14} /> },
          { label: "Learn stock market basics", icon: <Lightbulb size={14} /> },
          { label: "Manage daily expenses", icon: <ChevronRight size={14} /> }
        ]
      }
    ],
    "Working Professional": [
      {
        question: "Great. Do you run out of money before the end of the month?",
        options: [
          { label: "Yes, often", icon: <ChevronRight size={14} /> },
          { label: "Sometimes", icon: <ChevronRight size={14} /> },
          { label: "No, I save", icon: <ChevronRight size={14} /> }
        ]
      },
      {
        question: "What is your primary investment goal?",
        options: [
          { label: "Buy a house/car", icon: <TrendingUp size={14} /> },
          { label: "Retirement", icon: <TrendingUp size={14} /> },
          { label: "Tax saving", icon: <Lightbulb size={14} /> }
        ]
      }
    ],
    "Business Owner": [
      {
        question: "Do you keep your personal and business finances strictly separate?",
        options: [
          { label: "Yes, completely", icon: <ChevronRight size={14} /> },
          { label: "No, they mix", icon: <ChevronRight size={14} /> },
          { label: "Trying to", icon: <ChevronRight size={14} /> }
        ]
      },
      {
        question: "What is your biggest financial challenge right now?",
        options: [
          { label: "Managing Cash Flow", icon: <TrendingUp size={14} /> },
          { label: "Investing profits", icon: <TrendingUp size={14} /> },
          { label: "Reducing tax burden", icon: <Lightbulb size={14} /> }
        ]
      }
    ],
    "ProCheck": {
      question: "Thanks! I’ve learned a lot about you 😊 What would you like me to do next?",
      options: [
        { label: "Show insights", icon: <TrendingUp size={14} /> },
        { label: "Exit", icon: <ChevronRight size={14} /> }
      ]
    }
  };

  const DEFAULT_OPTIONS = [
    { label: "Tips for beginners", icon: <Lightbulb size={14} /> },
    { label: "Market update", icon: <TrendingUp size={14} /> },
    { label: "Saving rules", icon: <ChevronRight size={14} /> }
  ];

  const [activeQuestions, setActiveQuestions] = useState([QUESTION_BANK["Start"]]);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', content: QUESTION_BANK["Start"].question }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('Thinking...');
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (!isLoading) return;
    const texts = ['Analyzing profile...', 'Checking resources...', 'Structuring advice...'];
    let i = 0;
    setLoadingText(texts[0]);
    const interval = setInterval(() => {
      i = (i + 1) % texts.length;
      setLoadingText(texts[i]);
    }, 600);
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');

    let promptText = text;

    // Handle onboarding flow intercept
    if (onboardingStep < activeQuestions.length) {
      const newAnswers = [...userAnswers, text];
      setUserAnswers(newAnswers);
      
      let nextStep = onboardingStep + 1;
      let currentQuestions = activeQuestions;

      // At Step 0, branch based on User Persona (Student vs Worker)
      if (onboardingStep === 0) {
        let branch = QUESTION_BANK["Working Professional"]; // Default
        if (text === "Student") branch = QUESTION_BANK["Student"];
        else if (text === "Business Owner") branch = QUESTION_BANK["Business Owner"];
        
        currentQuestions = [QUESTION_BANK["Start"], ...branch, QUESTION_BANK["ProCheck"]];
        setActiveQuestions(currentQuestions);
      }

      // Handle branch logic at final Pro Check
      if (nextStep === currentQuestions.length && currentQuestions[currentQuestions.length-1].question.includes("Thanks!")) {
        // Wait, the nextStep points outside the array. So this check should be:
      }

      const isProCheckStep = onboardingStep === currentQuestions.length - 1;

      if (isProCheckStep) {
        if (text === "Show insights") {
          nextStep = 999; // trigger insights
        } else if (text === "Exit") {
          setIsLoading(false);
          setOnboardingStep(999);
          setMessages(prev => [
            ...prev,
            { id: Date.now() + 1, sender: 'bot', content: "Okay! Feel free to use the quick options below whenever you're ready to explore." }
          ]);
          return;
        } else {
          nextStep = 999; // fallback
        }
      }

      setOnboardingStep(nextStep);

      if (nextStep < currentQuestions.length) {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          setMessages((prev) => [
            ...prev,
            { id: Date.now() + 1, sender: 'bot', content: currentQuestions[nextStep].question }
          ]);
        }, 500);
        return; // Don't call backend yet
      } else {
        // End of onboarding (either finished advanced, or jumped via Show Insights)
        promptText = `My Profile: I am a ${newAnswers[0] || 'User'}. Additional info: ${newAnswers[1] || ''}, ${newAnswers[2] || ''}. Generate my custom profile, recommendations, and suggestions.`;
      }
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: promptText }),
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
            <div className="card profile-card" style={{ animationDelay: '0.1s' }}>
              <div className="card-title">
                <User size={16} /> User Profile
              </div>
              <div className="card-content">
                {profileMatch[1].trim()}
              </div>
            </div>

            {recsMatch && (
              <div className="card recommendations-card" style={{ animationDelay: '0.3s' }}>
                <div className="card-title">
                  <TrendingUp size={16} /> Recommendations
                </div>
                <div className="card-content">
                  {recsMatch[1].trim()}
                </div>
              </div>
            )}

            {suggMatch && (
              <div className="card suggestions-card" style={{ animationDelay: '0.5s' }}>
                <div className="card-title">
                  <Lightbulb size={16} /> Suggestions
                </div>
                <div className="card-content">
                  <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                    {suggMatch[1].trim().split('\n').map((suggestion, index) => {
                      // Remove leading dashes or bullets if any
                      const cleanText = suggestion.replace(/^[-*]\s*/, '').trim();
                      if (!cleanText) return null;
                      return (
                        <li key={index} style={{ marginBottom: '8px' }}>
                          <button 
                            className="suggestion-btn"
                            onClick={() => handleSendMessage(cleanText)}
                            disabled={isLoading}
                          >
                            <ChevronRight size={14} style={{ marginRight: '6px' }} />
                            {cleanText}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
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
            <div className="typing-indicator" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
              <div style={{ display: 'flex', gap: '4px' }}>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{loadingText}</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Options */}
      <div className="quick-options">
        {(onboardingStep < activeQuestions.length ? activeQuestions[onboardingStep].options : DEFAULT_OPTIONS).map((option, index) => (
          <button 
            key={index} 
            className="quick-btn"
            onClick={() => handleSendMessage(option.label)}
            disabled={isLoading}
          >
            {option.icon}
            {option.label}
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
