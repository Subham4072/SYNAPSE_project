import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';

type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinedDate: string;
};

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

interface ChatbotProps {
  user: User;
}

const Chatbot: React.FC<ChatbotProps> = ({ user }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `Hello ${user.name}! I'm your AI mental health companion. I'm here to listen, support, and guide you through any challenges you're facing. How are you feeling today?`,
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const botResponses = [
    {
      keywords: ['sad', 'depressed', 'down', 'low'],
      responses: [
        "I hear that you're feeling sad, and I want you to know that your feelings are completely valid. It's okay to have difficult days. What's been weighing on your mind lately?",
        "Thank you for sharing that with me. Feeling down can be really tough. Sometimes it helps to talk through what's causing these feelings. Would you like to share more?",
        "I'm sorry you're going through a difficult time. Remember that sadness is a natural emotion, and you don't have to face it alone. What usually helps you feel a little better?"
      ]
    },
    {
      keywords: ['anxious', 'worried', 'stressed', 'anxiety', 'panic'],
      responses: [
        "Anxiety can feel overwhelming, but you're taking a positive step by reaching out. Let's try some breathing exercises together. Take a deep breath in for 4 counts, hold for 4, and exhale for 6.",
        "I understand that anxiety can make everything feel more intense. You're safe right now. What's one thing you can see, hear, and feel around you? This can help ground you in the present moment.",
        "Stress and worry are challenging, but remember that you've handled difficult situations before. What strategies have helped you cope with stress in the past?"
      ]
    },
    {
      keywords: ['good', 'great', 'happy', 'excited', 'positive'],
      responses: [
        "That's wonderful to hear! I'm so glad you're feeling good today. What's been going particularly well for you?",
        "It's great that you're having a positive day! These moments are important to acknowledge and celebrate. What's bringing you joy right now?",
        "I love hearing when you're feeling good! Positive emotions are just as important to discuss as difficult ones. What's been the highlight of your day?"
      ]
    },
    {
      keywords: ['tired', 'exhausted', 'sleep', 'fatigue'],
      responses: [
        "Feeling tired can really impact your emotional wellbeing. How has your sleep been lately? Good rest is crucial for mental health.",
        "Exhaustion can make everything feel more difficult. Are you getting enough sleep, or is there something else that might be draining your energy?",
        "Being tired affects how we handle stress and emotions. Let's talk about your sleep routine and see if we can identify ways to help you feel more rested."
      ]
    },
    {
      keywords: ['help', 'support', 'advice'],
      responses: [
        "I'm here to support you in any way I can. What specific area would you like help with today?",
        "Of course, I'd be happy to help! What's been on your mind that you'd like to work through together?",
        "You've come to the right place for support. What kind of guidance are you looking for today?"
      ]
    }
  ];

  const getRandomResponse = (responses: string[]) => {
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const responseSet of botResponses) {
      for (const keyword of responseSet.keywords) {
        if (lowerMessage.includes(keyword)) {
          return getRandomResponse(responseSet.responses);
        }
      }
    }

    // Default responses
    const defaultResponses = [
      "Thank you for sharing that with me. Can you tell me more about how you're feeling?",
      "I appreciate you opening up. What would be most helpful for you to talk about right now?",
      "That sounds important. How has this been affecting your daily life?",
      "I'm listening. Would you like to explore this feeling a bit deeper?",
      "It sounds like you're going through something significant. What support do you think would be most helpful right now?"
    ];

    return getRandomResponse(defaultResponses);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">AI Support Chat</h1>
        <p className="text-purple-100">Your 24/7 mental health companion</p>
      </div>

      {/* Chat Container */}
      <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg overflow-hidden">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold">SYNAPSE AI</h3>
              <p className="text-sm text-purple-100">Mental Health Assistant</p>
            </div>
            <div className="ml-auto">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs">Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-blue-500 text-white ml-auto'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <div className="flex items-start space-x-2">
                  {message.sender === 'bot' && (
                    <Bot className="w-4 h-4 mt-0.5 text-purple-600 flex-shrink-0" />
                  )}
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  {message.sender === 'user' && (
                    <User className="w-4 h-4 mt-0.5 text-blue-100 flex-shrink-0" />
                  )}
                </div>
                <p className="text-xs mt-1 opacity-70">
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-800 max-w-xs px-4 py-3 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Bot className="w-4 h-4 text-purple-600" />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex space-x-3">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here..."
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              rows={1}
              style={{ minHeight: '40px', maxHeight: '120px' }}
            />
            <button
              onClick={handleSendMessage}
              disabled={inputMessage.trim() === '' || isTyping}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Crisis Support Info */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h3 className="font-semibold text-red-800 mb-2">Crisis Support</h3>
        <p className="text-sm text-red-700 mb-2">
          If you're experiencing a mental health crisis, please reach out for immediate help:
        </p>
        <div className="space-y-1 text-sm text-red-700">
          <p>• National Crisis Text Line: Text HOME to 741741</p>
          <p>• National Suicide Prevention Lifeline: 988</p>
          <p>• Emergency Services: 911</p>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;