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

  const primaryColor = "#DAA520"; // Gold
  const accentColor = darkMode ? "#FFFFFF" : "#111111";
  const textColorClass = darkMode ? "text-white" : "text-black";

  return (
    <div className={`flex items-center ${className}`}>
      <div className={`${sizeMap[size]} mr-2`}>
        <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Modern, striking cat design */}
          
          {/* Hexagonal cat face */}
          <path 
            d="M10 25L18 10H32L40 25L32 40H18L10 25Z" 
            fill={primaryColor}
            strokeWidth="1.5"
            stroke={primaryColor}
          />
          
          {/* Angular cat ears */}
          <path 
            d="M18 10L13 3L23 5L18 10Z" 
            fill={primaryColor}
            strokeWidth="1"
            stroke={primaryColor}
          />
          <path 
            d="M32 10L37 3L27 5L32 10Z" 
            fill={primaryColor}
            strokeWidth="1"
            stroke={primaryColor}
          />
          
          {/* Striking cat eyes - slanted slits */}
          <path 
            d="M18 22L24 26L18 30Z" 
            fill={accentColor}
          />
          <path 
            d="M32 22L26 26L32 30Z" 
            fill={accentColor}
          />
          
          {/* Central diamond nose */}
          <path 
            d="M23 26L25 24L27 26L25 28Z" 
            fill={accentColor}
          />
          
          {/* Geometric whiskers */}
          <line 
            x1="15" y1="27" x2="5" y2="25" 
            stroke={accentColor} 
            strokeWidth="1" 
            strokeLinecap="round"
          />
          <line 
            x1="15" y1="29" x2="5" y2="31" 
            stroke={accentColor} 
            strokeWidth="1" 
            strokeLinecap="round"
          />
          <line 
            x1="35" y1="27" x2="45" y2="25" 
            stroke={accentColor} 
            strokeWidth="1" 
            strokeLinecap="round"
          />
          <line 
            x1="35" y1="29" x2="45" y2="31" 
            stroke={accentColor} 
            strokeWidth="1" 
            strokeLinecap="round"
          />
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