import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCV } from "@/lib/context";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, addMessage } = useCV();
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
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
        "Purr-fect! For your resume, make sure to tailor it to each job application.",
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
      {/* Chat Button */}
      <button 
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-black text-white flex items-center justify-center shadow-lg hover:bg-[#DAA520] transition-all relative"
        onClick={toggleChat}
      >
        <div className="absolute top-[-10px] left-[7px] w-[15px] h-[15px] bg-[#DAA520] rounded-t-full transform -rotate-30"></div>
        <div className="absolute top-[-10px] right-[7px] w-[15px] h-[15px] bg-[#DAA520] rounded-t-full transform rotate-30"></div>
        <i className="fas fa-comment-dots text-xl"></i>
      </button>
      
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-[5.5rem] right-6 z-50 bg-white rounded-lg shadow-lg w-80 md:w-96 overflow-hidden flex flex-col" style={{ height: "400px" }}>
          {/* Chat Header */}
          <div className="bg-black text-white p-4 flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-[#DAA520] flex items-center justify-center mr-3 relative">
                <div className="absolute top-[-4px] left-[7px] w-[8px] h-[8px] bg-[#DAA520] rounded-t-full transform -rotate-30"></div>
                <div className="absolute top-[-4px] right-[7px] w-[8px] h-[8px] bg-[#DAA520] rounded-t-full transform rotate-30"></div>
                <i className="fas fa-cat text-black text-sm"></i>
              </div>
              <div>
                <h3 className="font-medium">CV Assistant</h3>
                <p className="text-xs text-gray-300">Online</p>
              </div>
            </div>
            <button onClick={toggleChat}>
              <i className="fas fa-times"></i>
            </button>
          </div>
          
          {/* Chat Messages */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            {messages.map((message) => (
              <div key={message.id} className={`flex items-start mb-4 ${message.isBot ? "" : "justify-end"}`}>
                {message.isBot && (
                  <div className="w-8 h-8 rounded-full bg-[#DAA520] flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-cat text-black text-sm"></i>
                  </div>
                )}
                <div className={`${
                  message.isBot 
                    ? "ml-3 bg-gray-100" 
                    : "mr-3 bg-black text-white"
                } rounded-lg py-2 px-3 max-w-[80%]`}>
                  <p>{message.text}</p>
                </div>
                {!message.isBot && (
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-user text-gray-600 text-sm"></i>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
            
            {/* Suggested Questions */}
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                  <button 
                    key={index}
                    className="text-xs bg-[#DAA520]/10 hover:bg-[#DAA520]/20 text-black px-3 py-1 rounded-full transition-all"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Chat Input */}
          <div className="p-3 border-t border-gray-200">
            <div className="flex items-center">
              <Input 
                type="text" 
                placeholder="Ask a question..." 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-[#DAA520] focus:border-[#DAA520]"
              />
              <Button 
                onClick={handleSendMessage}
                className="bg-black text-white px-4 py-2 rounded-r-md hover:bg-[#DAA520] transition-all"
              >
                <i className="fas fa-arrow-up"></i>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
