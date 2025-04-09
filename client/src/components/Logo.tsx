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
  const bgColor = darkMode ? "#222222" : "#FFFFFF";
  const textColorClass = darkMode ? "text-white" : "text-black";

  return (
    <div className={`flex items-center ${className}`}>
      <div className={`${sizeMap[size]} mr-2`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Silhouette cat face based on the reference image */}
          
          {/* Circular frame */}
          <path 
            d="M10 50 A 40 40 0 1 0 90 50 A 40 40 0 1 1 10 50 Z" 
            fill="none"
            stroke={primaryColor}
            strokeWidth="6"
          />
          
          {/* Cat head shape */}
          <path 
            d="M25 75 C 30 85 70 85 75 75 C 78 55 75 40 50 40 C 25 40 22 55 25 75 Z" 
            fill={primaryColor}
          />
          
          {/* Left ear */}
          <path 
            d="M30 42 L 15 20 L 45 30 Z" 
            fill={primaryColor}
          />
          
          {/* Right ear */}
          <path 
            d="M70 42 L 85 20 L 55 30 Z" 
            fill={primaryColor}
          />
          
          {/* Left eye */}
          <ellipse 
            cx="35" 
            cy="55" 
            rx="5" 
            ry="7" 
            fill={bgColor}
          />
          
          {/* Right eye */}
          <ellipse 
            cx="65" 
            cy="55" 
            rx="5" 
            ry="7" 
            fill={bgColor}
          />
          
          {/* Nose */}
          <path 
            d="M47 65 L 50 68 L 53 65 Z" 
            fill={bgColor}
          />
          
          {/* Left whiskers */}
          <line 
            x1="30" y1="65" x2="15" y2="60" 
            stroke={bgColor} 
            strokeWidth="1.5" 
          />
          <line 
            x1="30" y1="68" x2="15" y2="68" 
            stroke={bgColor} 
            strokeWidth="1.5" 
          />
          <line 
            x1="30" y1="71" x2="15" y2="76" 
            stroke={bgColor} 
            strokeWidth="1.5" 
          />
          
          {/* Right whiskers */}
          <line 
            x1="70" y1="65" x2="85" y2="60" 
            stroke={bgColor} 
            strokeWidth="1.5" 
          />
          <line 
            x1="70" y1="68" x2="85" y2="68" 
            stroke={bgColor} 
            strokeWidth="1.5" 
          />
          <line 
            x1="70" y1="71" x2="85" y2="76" 
            stroke={bgColor} 
            strokeWidth="1.5" 
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