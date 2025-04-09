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
  const secondaryColor = darkMode ? "#FFFFFF" : "#333333";
  const textColorClass = darkMode ? "text-white" : "text-black";

  return (
    <div className={`flex items-center ${className}`}>
      <div className={`${sizeMap[size]} mr-2`}>
        <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Sleek, modern cat using overlapping shapes */}
          
          {/* Outer circle as the base */}
          <circle 
            cx="25" 
            cy="25" 
            r="15"
            fill={primaryColor}
          />
          
          {/* Cat ears - two triangles */}
          <path 
            d="M15 18L20 25L25 18L15 18Z" 
            fill={primaryColor}
            transform="rotate(-25, 20, 22)"
          />
          <path 
            d="M25 18L30 25L35 18L25 18Z" 
            fill={primaryColor}
            transform="rotate(25, 30, 22)"
          />
          
          {/* Cat eyes - two ellipses */}
          <ellipse 
            cx="19" 
            cy="22" 
            rx="2.5" 
            ry="3.5" 
            fill={secondaryColor}
            transform="rotate(-10, 19, 22)"
          />
          <ellipse 
            cx="31" 
            cy="22" 
            rx="2.5" 
            ry="3.5" 
            fill={secondaryColor}
            transform="rotate(10, 31, 22)"
          />
          
          {/* Cat nose - small triangle */}
          <path 
            d="M23 28L25 30L27 28Z" 
            fill={secondaryColor}
          />
          
          {/* Cat mouth - simple curved line */}
          <path 
            d="M22 32Q25 35 28 32" 
            stroke={secondaryColor}
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
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