import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Define message type
interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hi there! I'm your resume assistant. How can I help you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  
  // Add a message to the chat
  const addMessage = (text: string, isBot: boolean) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
  };
  
  // Handle sending a new message
  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    
    // Add user message
    addMessage(inputText, false);
    
    // Simulate bot response (in a real app, this would call an API)
    setTimeout(() => {
      const botResponses = [
        "That's a great question about your resume. I'd recommend focusing on quantifiable achievements.",
        "For your resume, make sure to tailor it to each job application.",
        "A well-structured resume should highlight your most relevant experience first.",
        "Have you considered adding a skills section? It's a great way to showcase your abilities!"
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      addMessage(randomResponse, true);
    }, 1000);
    
    setInputText("");
  };
  
  // Handle key press (Enter to send)
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  
  // Common chat suggestions
  const suggestions = [
    "How to improve my resume?",
    "Resume vs. CV?",
    "Tips for job applications"
  ];
  
  // Handle suggestion click
  const handleSuggestionClick = (text: string) => {
    setInputText(text);
    addMessage(text, false);
    
    // Simulate bot response for suggestions
    setTimeout(() => {
      let response = "";
      
      switch(text) {
        case "How to improve my resume?":
          response = "To improve your resume: 1) Quantify achievements, 2) Tailor it to each job, 3) Use action verbs, 4) Keep it concise, and 5) Proofread carefully!";
          break;
        case "Resume vs. CV?":
          response = "A resume is typically 1-2 pages summarizing relevant experience for a specific job. A CV (Curriculum Vitae) is longer and details your entire career, including publications, awards, etc. In the US, CVs are mainly used in academia.";
          break;
        case "Tips for job applications":
          response = "For job applications: 1) Research the company, 2) Tailor your resume and cover letter, 3) Prepare for common interview questions, 4) Follow up after applying, and 5) Keep track of all applications in a spreadsheet.";
          break;
        default:
          response = "I'm not sure about that. Can you ask something else about resumes?";
      }
      
      addMessage(response, true);
    }, 1000);
  };
  
  return (
    <>
      {/* Chat Button */}
      <button 
        className="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full bg-[#0d6efd] text-white flex items-center justify-center shadow-lg hover:bg-[#0b5ed7] transition-all"
        onClick={toggleChat}
        aria-label="Open chat assistant"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
        </svg>
      </button>
      
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-[5.5rem] right-6 z-50 bg-white rounded-lg shadow-lg w-80 md:w-96 overflow-hidden flex flex-col border border-gray-200" style={{ height: "450px" }}>
          {/* Chat Header */}
          <div className="bg-[#0d6efd] text-white p-3 flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-sm">Resume Assistant</h3>
                <p className="text-xs text-white/70">Online</p>
              </div>
            </div>
            <button 
              onClick={toggleChat}
              className="text-white/80 hover:text-white"
              aria-label="Close chat"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          {/* Chat Messages */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50">
            {messages.map((message) => (
              <div key={message.id} className={`flex items-start mb-4 ${message.isBot ? "" : "justify-end"}`}>
                {message.isBot && (
                  <div className="w-8 h-8 rounded-full bg-[#0d6efd] flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                )}
                <div className={`${
                  message.isBot 
                    ? "ml-3 bg-white border border-gray-200" 
                    : "mr-3 bg-[#0d6efd] text-white"
                } rounded-lg py-2 px-3 max-w-[80%] shadow-sm`}>
                  <p className="text-sm">{message.text}</p>
                </div>
                {!message.isBot && (
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
            
            {/* Suggested Questions */}
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {suggestions.map((suggestion, index) => (
                  <button 
                    key={index}
                    className="text-xs bg-white hover:bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full transition-all border border-gray-200"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Chat Input */}
          <div className="p-3 border-t border-gray-200 bg-white">
            <div className="flex items-center">
              <Input 
                type="text" 
                placeholder="Type your question..." 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-[#0d6efd] focus:border-[#0d6efd]"
              />
              <Button 
                onClick={handleSendMessage}
                className="bg-[#0d6efd] text-white px-4 py-2 rounded-r-md hover:bg-[#0b5ed7] transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
