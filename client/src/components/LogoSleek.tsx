import React from 'react';

interface LogoSleekProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  darkMode?: boolean;
}

export default function LogoSleek({ 
  className = "", 
  size = "md", 
  showText = true,
  darkMode = false 
}: LogoSleekProps) {
  // Size mapping
  const sizeMap = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  // Text size mapping
  const textSizeMap = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  const textColor = darkMode ? "text-white" : "text-black";
  const accentColor = "#DAA520";
  const eyeFillColor = darkMode ? "#eee" : "#333";
  const bgColor = darkMode ? "#222" : "white";

  return (
    <div className={`flex items-center ${className}`}>
      <div className={`${sizeMap[size]} mr-2`}>
        <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="50" height="50" rx="10" fill={bgColor}/>
          <path d="M25 10C25 10 28 16 24 22C21 26 16 30 18 38C18 38 24 36 25 26C25 26 27 36 35 42C35 42 41 34 35 28C29 22 31 16 31 16C31 16 28 17 25 17C22 17 19 16 19 16C19 16 21 22 15 28C9 34 15 42 15 42C23 36 25 26 25 26C26 36 32 38 32 38C34 30 29 26 26 22C22 16 25 10 25 10Z" fill={accentColor}/>
          <rect x="20" y="18" width="2" height="2" rx="1" fill={eyeFillColor}/>
          <rect x="28" y="18" width="2" height="2" rx="1" fill={eyeFillColor}/>
          <path d="M23 24C24 25 26 25 27 24" stroke={eyeFillColor} strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>
      {showText && (
        <span className={`font-bold ${textSizeMap[size]}`}>
          <span className={textColor}>CV</span><span className="text-[#DAA520]">Cat</span>
        </span>
      )}
    </div>
  );
}