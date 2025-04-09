import React from 'react';

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  darkMode?: boolean;
}

export default function Logo({ className = "", size = "md", showText = true, darkMode = false }: LogoProps) {
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

  const primaryColor = "#DAA520";
  const textColorClass = darkMode ? "text-white" : "text-black";
  const accentColor = darkMode ? "#FFFFFF" : "#333333";

  return (
    <div className={`flex items-center ${className}`}>
      <div className={`${sizeMap[size]} mr-2`}>
        <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Completely new minimal cat logo using geometric shapes */}
          <g>
            {/* Head - simple circle */}
            <circle 
              cx="25" 
              cy="25" 
              r="18" 
              fill={darkMode ? "#333" : "#FFFFFF"} 
              stroke={primaryColor}
              strokeWidth="1.5"
            />
            
            {/* Cat ears - triangles */}
            <polygon 
              points="13,17 19,25 7,25" 
              fill={primaryColor} 
              transform="rotate(-10, 13, 17)"
            />
            <polygon 
              points="37,17 43,25 31,25" 
              fill={primaryColor} 
              transform="rotate(10, 37, 17)"
            />
            
            {/* Cat eyes - minimal slits */}
            <line 
              x1="18" y1="22" x2="22" y2="24" 
              stroke={accentColor} 
              strokeWidth="1.5" 
              strokeLinecap="round"
            />
            <line 
              x1="32" y1="22" x2="28" y2="24" 
              stroke={accentColor} 
              strokeWidth="1.5" 
              strokeLinecap="round"
            />
            
            {/* Whiskers - minimal horizontal lines */}
            <line 
              x1="10" y1="30" x2="18" y2="30" 
              stroke={accentColor} 
              strokeWidth="0.8" 
              strokeLinecap="round"
              opacity="0.6"
            />
            <line 
              x1="10" y1="32" x2="16" y2="32" 
              stroke={accentColor} 
              strokeWidth="0.8" 
              strokeLinecap="round"
              opacity="0.6"
            />
            <line 
              x1="40" y1="30" x2="32" y2="30" 
              stroke={accentColor} 
              strokeWidth="0.8" 
              strokeLinecap="round"
              opacity="0.6"
            />
            <line 
              x1="40" y1="32" x2="34" y2="32" 
              stroke={accentColor} 
              strokeWidth="0.8" 
              strokeLinecap="round"
              opacity="0.6"
            />
            
            {/* Nose - small triangle */}
            <polygon 
              points="25,28 23,30 27,30" 
              fill={primaryColor} 
            />
            
            {/* Mouth - simple line */}
            <path 
              d="M22,34 C24,36 26,36 28,34" 
              stroke={accentColor} 
              strokeWidth="1" 
              strokeLinecap="round"
            />
          </g>
        </svg>
      </div>
      {showText && (
        <span className={`font-bold ${textSizeMap[size]}`}>
          <span className={textColorClass}>CV</span><span className="text-[#DAA520]">Cat</span>
        </span>
      )}
    </div>
  );
}