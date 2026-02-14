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
  const primaryColor = "#DAA520";
  const bgColor = darkMode ? "#222222" : "#FFFFFF";

  return (
    <div className={`flex items-center ${className}`}>
      <div className={`${sizeMap[size]} mr-2`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="15" fill={bgColor}/>
          
          {/* Semi-circular frame */}
          <path 
            d="M15 50 A 35 35 0 1 0 85 50" 
            stroke={primaryColor}
            strokeWidth="5"
          />
          
          {/* Cat head shape */}
          <path 
            d="M30 75 L 70 75 C 73 55 70 40 50 40 C 30 40 27 55 30 75 Z" 
            fill={primaryColor}
          />
          
          {/* Left ear */}
          <path 
            d="M35 42 L 20 20 L 45 30 Z" 
            fill={primaryColor}
          />
          
          {/* Right ear */}
          <path 
            d="M65 42 L 80 20 L 55 30 Z" 
            fill={primaryColor}
          />
          
          {/* Left eye */}
          <ellipse 
            cx="40" 
            cy="55" 
            rx="4" 
            ry="5" 
            fill={bgColor}
          />
          
          {/* Right eye */}
          <ellipse 
            cx="60" 
            cy="55" 
            rx="4" 
            ry="5" 
            fill={bgColor}
          />
          
          {/* Nose */}
          <path 
            d="M47 64 L 50 67 L 53 64 Z" 
            fill={bgColor}
          />
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