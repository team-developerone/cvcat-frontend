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
  const accentColor = darkMode ? "#FFFFFF" : "#222222";
  const bgColor = darkMode ? "#333" : "#FFFFFF";

  return (
    <div className={`flex items-center ${className}`}>
      <div className={`${sizeMap[size]} mr-2`}>
        <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Alternative geometric cat logo design */}
          <g>
            {/* Base shape - rounded square */}
            <rect 
              x="10" 
              y="10" 
              width="30" 
              height="30" 
              rx="12" 
              fill={bgColor}
              stroke={primaryColor} 
              strokeWidth="1.5"
            />
            
            {/* Cat ears */}
            <path 
              d="M10 22L2 12L18 12Z" 
              fill={primaryColor} 
            />
            <path 
              d="M40 22L48 12L32 12Z" 
              fill={primaryColor} 
            />
            
            {/* Cat eyes - minimal circles */}
            <circle 
              cx="18" 
              cy="25" 
              r="2" 
              fill={primaryColor} 
              opacity="0.8"
            />
            <circle 
              cx="32" 
              cy="25" 
              r="2" 
              fill={primaryColor} 
              opacity="0.8"
            />
            
            {/* Simple dot for nose */}
            <circle 
              cx="25" 
              cy="32" 
              r="1.5" 
              fill={accentColor} 
            />
            
            {/* Whiskers - minimal diagonal strokes */}
            <line 
              x1="15" y1="32" x2="8" y2="30" 
              stroke={accentColor} 
              strokeWidth="0.8" 
              strokeLinecap="round"
              opacity="0.6"
            />
            <line 
              x1="15" y1="34" x2="7" y2="35" 
              stroke={accentColor} 
              strokeWidth="0.8" 
              strokeLinecap="round"
              opacity="0.6"
            />
            <line 
              x1="35" y1="32" x2="42" y2="30" 
              stroke={accentColor} 
              strokeWidth="0.8" 
              strokeLinecap="round"
              opacity="0.6"
            />
            <line 
              x1="35" y1="34" x2="43" y2="35" 
              stroke={accentColor} 
              strokeWidth="0.8" 
              strokeLinecap="round"
              opacity="0.6"
            />
            
            {/* Stylish accent */}
            <path 
              d="M20 36C21.5 38.5 28.5 38.5 30 36" 
              stroke={primaryColor} 
              strokeWidth="1.5" 
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