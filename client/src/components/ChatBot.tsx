import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

// Define message type
interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

// Define bot state type
type BotState = "idle" | "thinking" | "typing" | "happy" | "curious" | "sleeping";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [botState, setBotState] = useState<BotState>("idle");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Meow! I'm your CV assistant. How can I help you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      // When opening chat, animate cat waking up
      setBotState("happy");
      setTimeout(() => setBotState("idle"), 2000);
    }
  };
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    // When expanding/collapsing, show brief reaction
    setBotState("curious");
    setTimeout(() => setBotState("idle"), 1000);
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
    
    // Animate cat happy when adding a bot message
    if (isBot) {
      setBotState("happy");
      setTimeout(() => setBotState("idle"), 1000);
    }
  };
  
  // Handle sending a new message
  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    
    // Add user message
    addMessage(inputText, false);
    
    // Show thinking state
    setBotState("thinking");
    setIsTyping(true);
    
    // Simulate bot response (in a real app, this would call an API)
    setTimeout(() => {
      // Change to typing state
      setBotState("typing");
      
      setTimeout(() => {
        const botResponses = [
          "Meow! That's a great question about your CV. I'd recommend focusing on quantifiable achievements.",
          "Purr-fect! For your CV, make sure to tailor it to each job application.",
          "A well-structured CV should highlight your most relevant experience first. Meow!",
          "Have you considered adding a skills section? It's a great way to showcase your abilities!"
        ];
        
        const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
        addMessage(randomResponse, true);
        setIsTyping(false);
      }, 1500);
    }, 1000);
    
    setInputText("");
  };
  
  // Handle key press (Enter to send)
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };
  
  // Update bot state based on input
  useEffect(() => {
    if (inputText.length > 0 && botState === "idle") {
      setBotState("curious");
    } else if (inputText.length === 0 && botState === "curious") {
      setBotState("idle");
    }
  }, [inputText, botState]);
  
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
    
    // Show thinking state
    setBotState("thinking");
    setIsTyping(true);
    
    // Simulate bot response for suggestions
    setTimeout(() => {
      // Change to typing state
      setBotState("typing");
      
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
        setIsTyping(false);
      }, 1500);
    }, 1000);
  };
  
  // Render cat animation based on state
  const renderCatAnimation = (size: "small" | "medium" | "large" = "medium") => {
    const sizeClasses = {
      small: "w-3 h-3",
      medium: "w-4 h-4",
      large: "w-8 h-8"
    };
    
    return (
      <div className="relative">
        {/* Cat Ears */}
        <motion.div 
          className={`absolute ${size === "small" ? "top-[-2px] left-[3px] w-[3px] h-[3px]" : size === "medium" ? "top-[-3px] left-[4px] w-[5px] h-[5px]" : "top-[-5px] left-[7px] w-[7px] h-[7px]"} bg-[#DAA520] rounded-t-full`}
          animate={{
            rotate: botState === "curious" ? [-10, -30, -10] : 
                   botState === "happy" ? [-20, -10, -20] : -20,
            scaleY: botState === "sleeping" ? 0.5 : 1
          }}
          transition={{ duration: 0.5, repeat: botState === "curious" || botState === "happy" ? Infinity : 0 }}
        />
        <motion.div 
          className={`absolute ${size === "small" ? "top-[-2px] right-[3px] w-[3px] h-[3px]" : size === "medium" ? "top-[-3px] right-[4px] w-[5px] h-[5px]" : "top-[-5px] right-[7px] w-[7px] h-[7px]"} bg-[#DAA520] rounded-t-full`}
          animate={{
            rotate: botState === "curious" ? [10, 30, 10] : 
                   botState === "happy" ? [20, 10, 20] : 20,
            scaleY: botState === "sleeping" ? 0.5 : 1
          }}
          transition={{ duration: 0.5, repeat: botState === "curious" || botState === "happy" ? Infinity : 0 }}
        />
        
        {/* Cat Face */}
        <motion.div 
          className={`${sizeClasses[size]} text-[#DAA520] relative`}
          animate={{
            rotate: botState === "thinking" ? [0, 5, -5, 0] : 0,
            scale: botState === "happy" ? [1, 1.1, 1] : 1
          }}
          transition={{ 
            duration: botState === "thinking" ? 0.8 : 0.5, 
            repeat: (botState === "thinking" || botState === "happy") ? Infinity : 0 
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Cat face shape */}
            <path 
              d="M12 5C12 5 13 9 10 12C9 13 7 14 7.5 18C7.5 18 11 17 12 12C12 12 13 17 17 19C17 19 19 15 17 13C15 11 16 9 16 9C16 9 15 10 14 10C13 10 13 9 13 9C13 9 13 10 12 10C11 10 10 9 10 9C10 9 11 11 9 13C7 15 9 19 9 19C13 17 14 12 14 12C15 17 18.5 18 18.5 18C19 14 17 13 16 12C13 9 14 5 14 5" 
              fill="currentColor"
            />
            
            {/* Eyes that change based on state */}
            {botState === "sleeping" ? (
              <>
                <motion.path 
                  d="M9 8.5C9 8.5 9.5 8 10.5 8M10.5 8C11.5 8 12 8.5 12 8.5" 
                  stroke="black" 
                  strokeWidth="0.5" 
                  strokeLinecap="round"
                  initial={false}
                  animate={{ d: "M9 8.5C9 8.5 9.5 8 10.5 8M10.5 8C11.5 8 12 8.5 12 8.5" }}
                />
                <motion.path 
                  d="M12 8.5C12 8.5 12.5 8 13.5 8M13.5 8C14.5 8 15 8.5 15 8.5" 
                  stroke="black" 
                  strokeWidth="0.5" 
                  strokeLinecap="round"
                  initial={false}
                  animate={{ d: "M12 8.5C12 8.5 12.5 8 13.5 8M13.5 8C14.5 8 15 8.5 15 8.5" }}
                />
              </>
            ) : (
              <>
                <motion.circle 
                  cx="10" 
                  cy="8" 
                  r={botState === "curious" || botState === "thinking" ? "1.2" : "0.8"} 
                  fill="black"
                  animate={{ 
                    scale: botState === "typing" ? [1, 1.2, 1] : 1,
                    cy: botState === "happy" ? 8.5 : 8
                  }}
                  transition={{ duration: 0.3, repeat: botState === "typing" ? Infinity : 0 }}
                />
                <motion.circle 
                  cx="14" 
                  cy="8" 
                  r={botState === "curious" || botState === "thinking" ? "1.2" : "0.8"} 
                  fill="black"
                  animate={{ 
                    scale: botState === "typing" ? [1, 1.2, 1] : 1,
                    cy: botState === "happy" ? 8.5 : 8
                  }}
                  transition={{ duration: 0.3, delay: 0.15, repeat: botState === "typing" ? Infinity : 0 }}
                />
              </>
            )}
            
            {/* Cat mouth that changes based on state */}
            {botState === "happy" ? (
              <motion.path 
                d="M11 10.5C11 10.5 12 11.5 13 10.5" 
                stroke="black" 
                strokeWidth="0.5" 
                strokeLinecap="round"
                initial={false}
                animate={{ d: "M11 11C11 11 12 12.5 13 11" }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
              />
            ) : botState === "thinking" ? (
              <motion.path 
                d="M11 10.5C11 10.5 11.5 10.2 12 10.5C12.5 10.8 13 10.5 13 10.5" 
                stroke="black" 
                strokeWidth="0.5" 
                strokeLinecap="round"
                initial={false}
                animate={{ 
                  d: [
                    "M11 10.5C11 10.5 11.5 10.2 12 10.5C12.5 10.8 13 10.5 13 10.5",
                    "M11 10.8C11 10.8 11.5 10.5 12 10.8C12.5 11.1 13 10.8 13 10.8",
                    "M11 10.5C11 10.5 11.5 10.2 12 10.5C12.5 10.8 13 10.5 13 10.5"
                  ]
                }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            ) : botState === "typing" ? (
              <motion.circle
                cx="12"
                cy="10.5"
                r="0.5"
                fill="black"
                animate={{ scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            ) : (
              <motion.path 
                d="M11 10.5C11 10.5 11.5 10.5 12 10.5C12.5 10.5 13 10.5 13 10.5" 
                stroke="black" 
                strokeWidth="0.5" 
                strokeLinecap="round"
              />
            )}
          </svg>
          
          {/* Additional effects for thinking state */}
          {botState === "thinking" && (
            <motion.div
              className="absolute -top-3 -right-3"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5], rotate: [0, 180, 360] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <svg className="w-2 h-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 8L6 12M5 19L10 14M12 21L16 17M19 17L21 15" stroke="#DAA520" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          )}
        </motion.div>
      </div>
    );
  };
  
  // Typing indicator component
  const TypingIndicator = () => (
    <div className="flex items-start mb-2">
      <div className="w-5 h-5 bg-[#DAA520] flex items-center justify-center flex-shrink-0 relative">
        {renderCatAnimation("small")}
      </div>
      <div className="ml-2 bg-white border border-gray-100 py-1.5 px-3">
        <div className="flex space-x-1">
          <motion.div 
            className="w-1 h-1 bg-gray-400 rounded-full"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: "loop" }}
          />
          <motion.div 
            className="w-1 h-1 bg-gray-400 rounded-full"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 0.8, delay: 0.2, repeat: Infinity, repeatType: "loop" }}
          />
          <motion.div 
            className="w-1 h-1 bg-gray-400 rounded-full"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 0.8, delay: 0.4, repeat: Infinity, repeatType: "loop" }}
          />
        </div>
      </div>
    </div>
  );
  
  return (
    <>
      {/* Chat Button - Fixed at bottom right of the viewport */}
      <motion.button 
        className="fixed bottom-4 right-4 z-[1000] h-12 w-12 bg-black text-white flex items-center justify-center hover:bg-[#DAA520] transition-all relative overflow-hidden"
        onClick={toggleChat}
        aria-label="Open chat assistant"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{ position: 'fixed', bottom: '16px', right: '16px' }}
      >
        {/* Cat Animation */}
        <div className="absolute inset-0 flex items-center justify-center">
          {renderCatAnimation("medium")}
        </div>
        
        {/* Button background glow effect */}
        <motion.div 
          className="absolute inset-0 bg-black opacity-0"
          animate={{ 
            boxShadow: [
              "0 0 0 0 rgba(218, 165, 32, 0)",
              "0 0 10px 3px rgba(218, 165, 32, 0.3)",
              "0 0 0 0 rgba(218, 165, 32, 0)"
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </motion.button>
      
      {/* Chat Window - Fixed position relative to viewport */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed z-[1000] bg-white border border-gray-100 overflow-hidden flex flex-col rounded shadow-lg" 
            style={{ 
              position: 'fixed', 
              bottom: '60px', 
              right: '16px', 
              height: isExpanded ? "calc(85vh - 80px)" : "560px", // Increased height, even more when expanded
              width: isExpanded ? "min(70vw, 800px)" : "320px", // 70% of viewport width with a maximum of 800px
              minWidth: isExpanded ? "350px" : "320px" // Minimum width when expanded
            }}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            {/* Chat Header */}
            <div className="bg-black text-white p-3 flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-7 h-7 flex items-center justify-center mr-2 relative">
                  {renderCatAnimation("medium")}
                </div>
                <div>
                  <h3 className="font-medium text-sm">CV Assistant</h3>
                  <div className="text-[10px] text-gray-300 flex items-center">
                    <span className={`block w-1.5 h-1.5 rounded-full mr-1 ${botState === "idle" ? "bg-green-400" : botState === "thinking" ? "bg-amber-400" : "bg-blue-400"}`}></span>
                    {botState === "idle" ? "Online" : botState === "thinking" ? "Thinking..." : botState === "typing" ? "Typing..." : "Active"}
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button 
                  onClick={toggleExpand}
                  className="text-white/80 hover:text-white"
                  aria-label={isExpanded ? "Collapse chat" : "Expand chat"}
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    {isExpanded ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 9L4 4m0 0h5m-5 0v5m12-7l5 5m0-5h-5m5 0v5M4 20l5-5m-5 5h5m-5 0v-5m12 5l5-5m-5 5v-5m0 5h5"></path>
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 0h-4m4 0l-5-5"></path>
                    )}
                  </svg>
                </button>
                <button 
                  onClick={toggleChat}
                  className="text-white/80 hover:text-white"
                  aria-label="Close chat"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Interactive Cat Character */}
            <div className="bg-gradient-to-b from-gray-50 to-gray-100 p-3 border-b border-gray-100">
              <div className="flex items-center">
                <motion.div 
                  className="w-12 h-12 bg-[#DAA520]/10 rounded-full flex items-center justify-center mr-3"
                  whileHover={{ scale: 1.05 }}
                  animate={{ 
                    boxShadow: botState === "thinking" ? 
                      ["0 0 0 0 rgba(218, 165, 32, 0)", "0 0 10px 2px rgba(218, 165, 32, 0.3)", "0 0 0 0 rgba(218, 165, 32, 0)"] : 
                      "none",
                  }}
                  transition={{ duration: 1.5, repeat: botState === "thinking" ? Infinity : 0 }}
                >
                  {renderCatAnimation("large")}
                </motion.div>
                <div>
                  <h4 className="font-medium text-xs">CVCat</h4>
                  <p className="text-[10px] text-gray-500">AI-powered CV assistant</p>
                  {botState === "thinking" && (
                    <motion.p 
                      className="text-[10px] text-[#DAA520] mt-1"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      Processing your question...
                    </motion.p>
                  )}
                  {botState === "typing" && (
                    <motion.p 
                      className="text-[10px] text-[#DAA520] mt-1"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      Crafting response...
                    </motion.p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Chat Messages */}
            <div className="flex-1 p-3 space-y-3 overflow-y-auto bg-gray-50">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div 
                    key={message.id} 
                    className={`flex items-start mb-2 ${message.isBot ? "" : "justify-end"}`}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  >
                    {message.isBot && (
                      <div className="w-6 h-6 bg-[#DAA520] flex items-center justify-center flex-shrink-0 relative">
                        {renderCatAnimation("small")}
                      </div>
                    )}
                    <motion.div 
                      className={`${
                        message.isBot 
                          ? "ml-2 bg-white border border-gray-100" 
                          : "mr-2 bg-black text-white"
                      } py-2 px-3 max-w-[80%] rounded-md`}
                      whileHover={{ scale: 1.01 }}
                    >
                      <p className="text-xs">{message.text}</p>
                      <p className="text-[8px] text-right mt-1 opacity-50">
                        {new Date(message.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </p>
                    </motion.div>
                    {!message.isBot && (
                      <div className="w-6 h-6 bg-gray-200 flex items-center justify-center flex-shrink-0 rounded-full">
                        <svg className="w-3.5 h-3.5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {/* Typing indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <TypingIndicator />
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div ref={messagesEndRef} />
              
              {/* Suggested Questions */}
              <AnimatePresence>
                {messages.length === 1 && (
                  <motion.div 
                    className="flex flex-wrap gap-1.5 mt-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {suggestions.map((suggestion, index) => (
                      <motion.button 
                        key={index}
                        className="text-[10px] bg-[#DAA520]/10 hover:bg-[#DAA520]/20 text-black px-2 py-1 border border-[#DAA520]/20 rounded-md"
                        onClick={() => handleSuggestionClick(suggestion)}
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(218, 165, 32, 0.2)" }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        {suggestion}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Chat Input */}
            <div className="p-3 border-t border-gray-100 bg-white">
              <div className="flex items-center">
                <Input 
                  type="text" 
                  placeholder="Ask CV question..." 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full px-3 py-2 text-xs border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#DAA520] rounded-l-md"
                />
                <Button 
                  onClick={handleSendMessage}
                  className="bg-black text-white px-3 py-2 rounded-r-md hover:bg-[#DAA520] transition-all"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </motion.div>
                </Button>
              </div>
              
              {/* Animated paw prints */}
              <motion.div 
                className="flex justify-end mt-2"
                animate={{ x: [0, -20, -40, -60, -80, -100] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 5,
                  repeatType: "loop",
                  ease: "linear" 
                }}
              >
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    width="12" 
                    height="12" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="mx-5"
                  >
                    <path d="M8 9C9.10457 9 10 8.10457 10 7C10 5.89543 9.10457 5 8 5C6.89543 5 6 5.89543 6 7C6 8.10457 6.89543 9 8 9Z" fill="#DAA520" fillOpacity="0.3"/>
                    <path d="M16 9C17.1046 9 18 8.10457 18 7C18 5.89543 17.1046 5 16 5C14.8954 5 14 5.89543 14 7C14 8.10457 14.8954 9 16 9Z" fill="#DAA520" fillOpacity="0.3"/>
                    <path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" fill="#DAA520" fillOpacity="0.3"/>
                    <path d="M5 15C6.10457 15 7 14.1046 7 13C7 11.8954 6.10457 11 5 11C3.89543 11 3 11.8954 3 13C3 14.1046 3.89543 15 5 15Z" fill="#DAA520" fillOpacity="0.3"/>
                    <path d="M19 15C20.1046 15 21 14.1046 21 13C21 11.8954 20.1046 11 19 11C17.8954 11 17 11.8954 17 13C17 14.1046 17.8954 15 19 15Z" fill="#DAA520" fillOpacity="0.3"/>
                  </svg>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
