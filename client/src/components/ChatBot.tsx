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
      text: "Meow! I'm your CV assistant. How can I help you today?",
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
        "Meow! That's a great question about your CV. I'd recommend focusing on quantifiable achievements.",
        "Purr-fect! For your CV, make sure to tailor it to each job application.",
        "A well-structured CV should highlight your most relevant experience first. Meow!",
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
    "How to improve my CV?",
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
        case "How to improve my CV?":
          response = "Meow! To improve your CV: 1) Quantify achievements, 2) Tailor it to each job, 3) Use action verbs, 4) Keep it concise, and 5) Proofread carefully!";
          break;
        case "Resume vs. CV?":
          response = "Purr! A resume is typically 1-2 pages summarizing relevant experience for a specific job. A CV (Curriculum Vitae) is longer and details your entire career, including publications, awards, etc. In the US, CVs are mainly used in academia.";
          break;
        case "Tips for job applications":
          response = "Meowsome question! For job applications: 1) Research the company, 2) Tailor your CV and cover letter, 3) Prepare for common interview questions, 4) Follow up after applying, and 5) Keep track of all applications in a spreadsheet.";
          break;
        default:
          response = "Meow! I'm not sure about that. Can you ask something else about CVs?";
      }
      
      addMessage(response, true);
    }, 1000);
  };
  
  return (
    <>
      {/* Chat Button - Fixed at bottom right of the viewport */}
      <button 
        className="fixed bottom-4 right-4 z-[1000] h-10 w-10 bg-black text-white flex items-center justify-center hover:bg-[#DAA520] transition-all relative"
        onClick={toggleChat}
        aria-label="Open chat assistant"
        style={{ position: 'fixed', bottom: '16px', right: '16px' }}
      >
        {/* Cat Ears - Smaller */}
        <div className="absolute top-[-7px] left-[5px] w-[10px] h-[10px] bg-[#DAA520] rounded-t-full transform -rotate-30"></div>
        <div className="absolute top-[-7px] right-[5px] w-[10px] h-[10px] bg-[#DAA520] rounded-t-full transform rotate-30"></div>
        
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 10H8.01M12 10H12.01M16 10H16.01M9 16H5C3.89543 16 3 15.1046 3 14V6C3 4.89543 3.89543 4 5 4H19C20.1046 4 21 4.89543 21 6V14C21 15.1046 20.1046 16 19 16H14L9 21V16Z" 
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      
      {/* Chat Window - Fixed position relative to viewport */}
      {isOpen && (
        <div className="fixed z-[1000] bg-white border border-gray-100 overflow-hidden flex flex-col" 
          style={{ position: 'fixed', bottom: '60px', right: '16px', height: "360px", width: "280px" }}>
          {/* Chat Header */}
          <div className="bg-black text-white p-2 flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-6 h-6 flex items-center justify-center mr-2 relative">
                {/* Cat Ears in Avatar - Smaller */}
                <div className="absolute top-[-3px] left-[5px] w-[6px] h-[6px] bg-[#DAA520] rounded-t-full transform -rotate-30"></div>
                <div className="absolute top-[-3px] right-[5px] w-[6px] h-[6px] bg-[#DAA520] rounded-t-full transform rotate-30"></div>
                
                <svg className="w-4 h-4 text-[#DAA520]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5C12 5 13 9 10 12C9 13 7 14 7.5 18C7.5 18 11 17 12 12C12 12 13 17 17 19C17 19 19 15 17 13C15 11 16 9 16 9C16 9 15 10 14 10C13 10 13 9 13 9C13 9 13 10 12 10C11 10 10 9 10 9C10 9 11 11 9 13C7 15 9 19 9 19C13 17 14 12 14 12C15 17 18.5 18 18.5 18C19 14 17 13 16 12C13 9 14 5 14 5" 
                    fill="currentColor"/>
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-xs">CV Assistant</h3>
              </div>
            </div>
            <button 
              onClick={toggleChat}
              className="text-white/80 hover:text-white"
              aria-label="Close chat"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          {/* Chat Messages */}
          <div className="flex-1 p-3 space-y-3 overflow-y-auto bg-gray-50">
            {messages.map((message) => (
              <div key={message.id} className={`flex items-start mb-2 ${message.isBot ? "" : "justify-end"}`}>
                {message.isBot && (
                  <div className="w-5 h-5 bg-[#DAA520] flex items-center justify-center flex-shrink-0 relative">
                    {/* Tiny Cat Ears */}
                    <div className="absolute top-[-2px] left-[4px] w-[4px] h-[4px] bg-[#DAA520] rounded-t-full transform -rotate-30"></div>
                    <div className="absolute top-[-2px] right-[4px] w-[4px] h-[4px] bg-[#DAA520] rounded-t-full transform rotate-30"></div>
                    
                    <svg className="w-3 h-3 text-black" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 5C12 5 13 9 10 12C9 13 7 14 7.5 18C7.5 18 11 17 12 12C12 12 13 17 17 19C17 19 19 15 17 13C15 11 16 9 16 9C16 9 15 10 14 10C13 10 13 9 13 9C13 9 13 10 12 10C11 10 10 9 10 9C10 9 11 11 9 13C7 15 9 19 9 19C13 17 14 12 14 12C15 17 18.5 18 18.5 18C19 14 17 13 16 12C13 9 14 5 14 5" 
                        fill="currentColor"/>
                    </svg>
                  </div>
                )}
                <div className={`${
                  message.isBot 
                    ? "ml-2 bg-white border border-gray-100" 
                    : "mr-2 bg-black text-white"
                } py-1.5 px-2 max-w-[80%]`}>
                  <p className="text-xs">{message.text}</p>
                </div>
                {!message.isBot && (
                  <div className="w-5 h-5 bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
            
            {/* Suggested Questions */}
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {suggestions.map((suggestion, index) => (
                  <button 
                    key={index}
                    className="text-[10px] bg-[#DAA520]/10 hover:bg-[#DAA520]/20 text-black px-2 py-1 border border-[#DAA520]/20"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Chat Input */}
          <div className="p-2 border-t border-gray-100 bg-white">
            <div className="flex items-center">
              <Input 
                type="text" 
                placeholder="Ask CV question..." 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-2 py-1 text-xs border border-gray-200 focus:outline-none focus:ring-0 focus:border-[#DAA520]"
              />
              <Button 
                onClick={handleSendMessage}
                className="bg-black text-white px-2 py-1 ml-1 hover:bg-[#DAA520] transition-all"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </Button>
            </div>
            
            {/* Minimal paw print */}
            <div className="flex justify-end mt-1">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 9C9.10457 9 10 8.10457 10 7C10 5.89543 9.10457 5 8 5C6.89543 5 6 5.89543 6 7C6 8.10457 6.89543 9 8 9Z" fill="#DAA520" fillOpacity="0.3"/>
                <path d="M16 9C17.1046 9 18 8.10457 18 7C18 5.89543 17.1046 5 16 5C14.8954 5 14 5.89543 14 7C14 8.10457 14.8954 9 16 9Z" fill="#DAA520" fillOpacity="0.3"/>
                <path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" fill="#DAA520" fillOpacity="0.3"/>
                <path d="M5 15C6.10457 15 7 14.1046 7 13C7 11.8954 6.10457 11 5 11C3.89543 11 3 11.8954 3 13C3 14.1046 3.89543 15 5 15Z" fill="#DAA520" fillOpacity="0.3"/>
                <path d="M19 15C20.1046 15 21 14.1046 21 13C21 11.8954 20.1046 11 19 11C17.8954 11 17 11.8954 17 13C17 14.1046 17.8954 15 19 15Z" fill="#DAA520" fillOpacity="0.3"/>
              </svg>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
